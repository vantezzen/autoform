"use client";
// Keep in sync with tanstack-array-table-wrapper.tsx (the TanStack Form version).

import { getLabel, type ParsedField } from "@autoform/core";
import type {
  ArrayElementWrapperProps,
  ArrayWrapperProps,
  AutoFormFieldProps,
} from "@autoform/react";
import { useAutoForm } from "@autoform/react/react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { useFormContext, useFormState } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Helpers ──────────────────────────────────────────────────────────────────

type Cell = { row: number; column: number };

/** Focusable controls a cell editor may render (input, select trigger, …). */
const EDITOR_SELECTOR =
  "input:not([type='hidden']):not(:disabled), textarea:not(:disabled), button:not(:disabled), [role='combobox']";

const ARROW_MOVES: Record<string, [row: number, column: number]> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

const isPrintableKey = (event: React.KeyboardEvent) =>
  event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey;

const isSameCell = (a: Cell | null, b: Cell) =>
  a?.row === b.row && a.column === b.column;

/** A field's label as plain text, for aria attributes. */
const labelText = (field: ParsedField) => {
  const label = getLabel(field);
  return typeof label === "string" ? label : field.key;
};

/** Next cell for Tab / Shift+Tab, wrapping across rows. */
function tabTarget(cell: Cell, rows: number, columns: number, back: boolean) {
  const index = cell.row * columns + cell.column + (back ? -1 : 1);
  if (index < 0 || index >= rows * columns) return null;
  return { row: Math.floor(index / columns), column: index % columns };
}

/**
 * Replaces an input's value as if the user typed `character`. React tracks
 * input values internally, so the native setter is needed for onChange to fire.
 * Number and date inputs reject some characters; those leave the value as is.
 */
function typeInto(editor: HTMLElement, character: string) {
  if (!(editor instanceof HTMLInputElement) || editor.type === "checkbox")
    return;
  const setValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;
  const previous = editor.value;
  setValue?.call(editor, character);
  if (editor.value !== character) return setValue?.call(editor, previous);
  editor.dispatchEvent(new Event("input", { bubbles: true }));
}

/** Strips the AutoForm controls' own borders so each cell looks flush. */
const GRID_STYLES = [
  // Editor wrapper fills the cell.
  "[&_[data-grid-editor]]:flex [&_[data-grid-editor]]:h-9 [&_[data-grid-editor]]:items-center",
  "[&_[data-grid-editor]>div]:h-full [&_[data-grid-editor]>div]:w-full [&_[data-grid-editor]>div]:px-2.5",
  // Inputs (text, number, date) and select triggers. `ring-offset` must be
  // reset too: shadcn's focus ring-offset paints a background-colored halo.
  "[&_[data-grid-editor]_input]:h-full [&_[data-grid-editor]_input]:w-full",
  "[&_[data-grid-editor]_input]:!rounded-none [&_[data-grid-editor]_input]:!border-0",
  "[&_[data-grid-editor]_input]:!bg-transparent [&_[data-grid-editor]_input]:!shadow-none",
  "[&_[data-grid-editor]_input]:!ring-0 [&_[data-grid-editor]_input]:!ring-offset-0",
  "[&_[data-grid-editor]_[role=combobox]]:h-full [&_[data-grid-editor]_[role=combobox]]:w-full",
  "[&_[data-grid-editor]_[role=combobox]]:!rounded-none [&_[data-grid-editor]_[role=combobox]]:!border-0",
  "[&_[data-grid-editor]_[role=combobox]]:!bg-transparent [&_[data-grid-editor]_[role=combobox]]:!shadow-none",
  "[&_[data-grid-editor]_[role=combobox]]:!ring-0 [&_[data-grid-editor]_[role=combobox]]:!ring-offset-0",
  // Checkbox labels repeat the column header, so hide them visually.
  "[&_[data-grid-editor]_label]:sr-only",
].join(" ");

// ── Keyboard navigation ──────────────────────────────────────────────────────

/**
 * Spreadsheet-style focus model: one cell is "active" (focused) and at most one
 * is "editing" (its control is interactive). The last column holds each row's
 * remove button, which Enter and Space press like any button. Focus moves are
 * requested through a ref and applied once the target cell has rendered.
 */
function useGridKeyboard(rowCount: number, columnCount: number) {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const pendingFocus = React.useRef<{
    cell: Cell;
    edit: boolean;
    character?: string;
  } | null>(null);
  const [active, setActive] = React.useState<Cell | null>(null);
  const [editing, setEditing] = React.useState<Cell | null>(null);
  const actionColumn = columnCount - 1;

  React.useLayoutEffect(() => {
    const request = pendingFocus.current;
    const element = request
      ? tableRef.current?.querySelector<HTMLElement>(
          `[data-grid-cell="${request.cell.row}:${request.cell.column}"]`,
        )
      : null;
    // A new row may not have rendered yet; keep the request until it has.
    if (!request || !element) return;
    pendingFocus.current = null;
    const editor = request.edit
      ? element.querySelector<HTMLElement>(EDITOR_SELECTOR)
      : null;
    if (!editor) return element.focus();
    editor.focus();
    // Enter "presses" the control: opens a select, toggles a checkbox.
    if (request.character === undefined) editor.click();
    else typeInto(editor, request.character);
  });

  const focusCell = (cell: Cell) => {
    setEditing(null);
    setActive(cell);
    pendingFocus.current = { cell, edit: false };
  };

  const startEditing = (cell: Cell, character?: string) => {
    setActive(cell);
    setEditing(cell);
    pendingFocus.current = { cell, edit: true, character };
  };

  const moveByTab = (cell: Cell, back: boolean) => {
    const next = tabTarget(cell, rowCount, columnCount, back);
    if (next) focusCell(next);
    return next !== null;
  };

  /**
   * AutoForm's boolean field submits the form on Enter. Inside the grid,
   * Enter on a checkbox only leaves edit mode.
   */
  const onKeyDownCapture = (event: React.KeyboardEvent) => {
    if (!editing || event.key !== "Enter") return;
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest("[role='checkbox']")) return;
    event.preventDefault();
    event.stopPropagation();
    focusCell(editing);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest("[data-grid-cell]")) return;

    if (editing) {
      const commitsInput =
        event.key === "Enter" && event.target instanceof HTMLInputElement;
      if (event.key === "Escape" || commitsInput) {
        event.preventDefault();
        focusCell(editing);
      } else if (event.key === "Tab") {
        if (moveByTab(editing, event.shiftKey)) event.preventDefault();
        else setEditing(null);
      }
      return;
    }
    if (!active) return;

    const move = ARROW_MOVES[event.key];
    if (move) {
      event.preventDefault();
      focusCell({
        row: Math.max(0, Math.min(rowCount - 1, active.row + move[0])),
        column: Math.max(0, Math.min(columnCount - 1, active.column + move[1])),
      });
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const column = event.key === "Home" ? 0 : columnCount - 1;
      focusCell({ row: active.row, column });
    } else if (event.key === "Tab") {
      if (moveByTab(active, event.shiftKey)) event.preventDefault();
    } else if (active.column === actionColumn) {
      // Let the remove button handle Enter and Space natively.
    } else if (event.key === "Enter") {
      event.preventDefault();
      startEditing(active);
    } else if (isPrintableKey(event)) {
      event.preventDefault();
      // Space toggles a checkbox; any other key starts typing a new value.
      startEditing(active, event.key === " " ? undefined : event.key);
    }
  };

  return {
    tableRef,
    active,
    editing,
    setActive,
    setEditing,
    focusCell,
    startEditing,
    onKeyDown,
    onKeyDownCapture,
  };
}

// ── Array wrapper ────────────────────────────────────────────────────────────

/**
 * Lays out an array of objects as an editable table. Set it on one array with
 * `fieldConfig({ arrayWrapper: ArrayTableWrapper })`.
 *
 * AutoForm still owns the array: it creates the rows (with stable keys and
 * their remove handlers), adds items with the schema defaults and validates
 * them. This wrapper only changes the layout. Instead of each row's generated
 * object field, it renders one cell per column with the AutoForm component
 * registered for that column's type.
 *
 * Limitations: columns should be scalar fields (text, number, date, select,
 * boolean). Because the generated row field is not rendered, errors on the row
 * object itself (e.g. a `.refine()` on the item schema) and per-field wrapper
 * overrides of the columns are not shown. Invalid cells are outlined in red with
 * their message shown inline, and AutoForm's focus-on-submit lands on the first
 * invalid cell (cell controls stay `inert` until a cell is edited).
 */
export function ArrayTableWrapper({
  label,
  error,
  children,
  onAddItem,
  inputProps,
  parsedField,
}: ArrayWrapperProps) {
  const { key, ref, "aria-invalid": ariaInvalid } = inputProps;
  // AutoForm passes no path to array wrappers. Its React Hook Form ArrayField
  // sets the add button's `key` to `${path}-input`, so the path comes from it.
  const path = String(key)
    .replace(/-input$/, "")
    .split(".");
  const rows = React.Children.toArray(children).filter(
    React.isValidElement<ArrayElementWrapperProps>,
  );
  const columns = parsedField.schema?.[0]?.schema ?? [];
  // The last grid column holds each row's remove button.
  const grid = useGridKeyboard(rows.length, columns.length + 1);
  const addButtonRef = React.useRef<HTMLButtonElement>(null);
  const { getValues, setValue } = useFormContext();

  // AutoForm appends only the schema defaults. React Hook Form shows a column
  // left `undefined` with the `defaultValues` entry that once sat at this
  // index, so fill those columns: `false` for booleans, otherwise `""`, which
  // AutoForm treats as empty (text, number, date and select columns).
  const addRow = () => {
    const rowPath = [...path, String(rows.length)];
    onAddItem();
    for (const column of columns) {
      const name = [...rowPath, column.key].join(".");
      if (getValues(name) !== undefined) continue;
      setValue(name, column.type === "boolean" ? false : "");
    }
    grid.focusCell({ row: rows.length, column: 0 });
  };

  // Keep focus in the table: on the next row's remove button, or on
  // "Add row" once the table is empty.
  const removeRow = (row: ArrayElementWrapperProps, rowIndex: number) => {
    row.onRemove();
    if (rows.length === 1) {
      grid.setActive(null);
      addButtonRef.current?.focus();
    } else {
      const next = Math.min(rowIndex, rows.length - 2);
      grid.focusCell({ row: next, column: columns.length });
    }
  };

  return (
    <div className="not-prose space-y-3">
      <div className="space-y-1">
        {/* AutoForm focuses this heading when the array itself is invalid. */}
        <h3
          ref={ref}
          tabIndex={-1}
          aria-invalid={ariaInvalid}
          className="text-sm font-medium outline-none"
        >
          {label}
          {parsedField.required && <span className="text-destructive"> *</span>}
        </h3>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div
        className={cn(
          "overflow-x-auto rounded-lg border",
          error && "border-destructive",
          "has-[td[aria-invalid=true]]:border-destructive",
        )}
      >
        <table
          ref={grid.tableRef}
          role="grid"
          aria-label={labelText(parsedField)}
          className={cn("w-full text-sm", GRID_STYLES)}
          onKeyDownCapture={grid.onKeyDownCapture}
          onKeyDown={grid.onKeyDown}
        >
          <thead className="bg-muted/40">
            <tr className="border-b">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-3 py-2 text-left font-medium"
                >
                  {getLabel(column)}
                </th>
              ))}
              <th scope="col" className="w-10">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.key}>
                {columns.map((column, columnIndex) => (
                  <ArrayTableCell
                    key={column.key}
                    grid={grid}
                    cell={{ row: rowIndex, column: columnIndex }}
                    column={column}
                    path={[...path, String(row.props.index), column.key]}
                  />
                ))}
                <td role="gridcell" className="border-b p-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    data-grid-cell={`${rowIndex}:${columns.length}`}
                    tabIndex={
                      isSameCell(grid.active, {
                        row: rowIndex,
                        column: columns.length,
                      })
                        ? 0
                        : -1
                    }
                    className="h-9 w-full rounded-none text-muted-foreground outline-none hover:text-destructive focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    aria-label={`Remove row ${rowIndex + 1}`}
                    onFocus={() =>
                      grid.setActive({ row: rowIndex, column: columns.length })
                    }
                    onClick={() => removeRow(row.props, rowIndex)}
                  >
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-3 py-6 text-center text-muted-foreground"
                >
                  No rows yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Button
        ref={addButtonRef}
        type="button"
        variant="outline"
        size="sm"
        onClick={addRow}
      >
        <Plus />
        Add row
      </Button>
    </div>
  );
}

// ── Cell ─────────────────────────────────────────────────────────────────────

type GridState = ReturnType<typeof useGridKeyboard>;

/** One grid cell around the column's AutoForm component. */
function ArrayTableCell({
  grid,
  cell,
  column,
  path,
}: {
  grid: GridState;
  cell: Cell;
  column: ParsedField;
  path: string[];
}) {
  // Read the error for the cell's current path: a row keeps its component
  // when an earlier row is removed, so its index (and path) can change.
  const id = path.join(".");
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: id, exact: true });
  const error = getFieldState(id, formState).error?.message;
  const { formComponents, uiComponents } = useAutoForm();
  const errorId = React.useId();
  const label = labelText(column);
  const active = isSameCell(grid.active, cell);
  const editing = isSameCell(grid.editing, cell);
  // Before any cell is active, the first cell is the grid's Tab stop.
  const isTabStop = grid.active
    ? active && !editing
    : cell.row === 0 && cell.column === 0;
  const FieldComponent: React.ComponentType<AutoFormFieldProps> | undefined =
    formComponents[column.type] ?? formComponents.fallback;

  return (
    <td
      role="gridcell"
      data-grid-cell={`${cell.row}:${cell.column}`}
      tabIndex={isTabStop ? 0 : -1}
      aria-label={label}
      aria-invalid={Boolean(error) || undefined}
      aria-describedby={error ? errorId : undefined}
      className={cn(
        "border-b border-r p-0 align-middle outline-none",
        error
          ? "bg-destructive/10 ring-2 ring-inset ring-destructive"
          : active && "ring-2 ring-inset ring-ring",
      )}
      onFocus={() => {
        if (!editing) grid.setActive(cell);
      }}
      onBlur={(event) => {
        // Leave edit mode once focus leaves the cell, unless it moved into the
        // control's own popup (e.g. an open select).
        const { currentTarget, relatedTarget } = event;
        const popupOpen = currentTarget.querySelector("[aria-expanded='true']");
        if (editing && !popupOpen && !currentTarget.contains(relatedTarget))
          grid.setEditing(null);
      }}
      onPointerDown={(event) => {
        if (editing) return;
        event.preventDefault();
        grid.startEditing(cell);
      }}
    >
      <div data-grid-editor inert={!editing}>
        {FieldComponent ? (
          <FieldComponent
            path={path}
            id={id}
            error={error}
            parsedField={column}
            label={getLabel(column)}
            inputProps={{
              ...column.fieldConfig?.inputProps,
              "aria-label": label,
              "aria-invalid": Boolean(error) || undefined,
            }}
          />
        ) : (
          <uiComponents.ErrorMessage
            error={`No component found for type "${column.type}"`}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="px-2.5 pb-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </td>
  );
}
