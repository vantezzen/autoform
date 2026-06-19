"use client";

import Link from "fumadocs-core/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "fumadocs-ui/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

// ─── layout constants (matching ui-components-table) ────────────────────────
const headerGrid = "grid gap-x-4 items-center";
const rowGrid = "grid gap-x-4 items-start";
// Scenario | Method(s) | Where
const tableGridTemplate = "minmax(0,1.8fr) minmax(0,1.8fr) minmax(0,1fr)";

// ─── types ───────────────────────────────────────────────────────────────────
interface RowEntry {
  scenario: string;
  methods: ReactNode;
  where: string;
  /** If provided, the row is collapsible and shows this content inside */
  detail?: ReactNode;
}

// ─── sub-table rendered inside the two dropdowns ─────────────────────────────
function InnerTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <table className="w-full text-xs border-collapse mt-1">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="text-left text-fd-muted-foreground font-medium px-2 py-1 border-b border-fd-border"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, ri) => (
          <tr key={ri} className="border-b border-fd-border last:border-0">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-2 py-1.5 align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── detail content for "Accessing / subscribing to form data" row ───────────
const FormDataDetail = (
  <div>
    <InnerTable
      headers={["Method", "Use when"]}
      rows={[
        [
          <Link
            key="uw"
            href="https://react-hook-form.com/docs/usewatch"
            className="font-mono underline text-fd-primary"
          >
            useWatch
          </Link>,
          "Subscribe to input changes with isolated component re-renders.",
        ],
        [
          <Link
            key="w"
            href="https://react-hook-form.com/docs/useform/watch"
            className="font-mono underline text-fd-primary"
          >
            watch
          </Link>,
          "Subscribe to input value changes and trigger re-render of the calling component",
        ],
        [
          <Link
            key="f"
            href="https://react-hook-form.com/docs/useform/formstate"
            className="font-mono underline text-fd-primary"
          >
            formState
          </Link>,
          "Access real-time form state properties, triggers re-render of the calling component",
        ],
        [
          <Link
            key="sub"
            href="https://react-hook-form.com/docs/useform/subscribe"
            className="font-mono underline text-fd-primary"
          >
            subscribe
          </Link>,
          "Subscribe to form state changes outside the render cycle. no re-render",
        ],
        [
          <Link
            key="gv"
            href="https://react-hook-form.com/docs/useform/getvalues"
            className="font-mono underline text-fd-primary"
          >
            getValues
          </Link>,
          "Read current form values without subscribing to re-renders.",
        ],
      ]}
    />
    <p className="text-sm text-fd-muted-foreground mt-2">
      These methods can be accessed via <code>useFormContext</code>{" "}
      <Link
        href="/docs/react/form-control#2-using-useformcontext-inside-autoform"
        className="underline font-sans text-fd-primary/60 "
      >
        see below
      </Link>
      {"  "}or imported directly eg: <code>useWatch</code>
    </p>
  </div>
);

// ─── detail content for "Custom field registration" row ──────────────────────
const FieldRegistrationDetail = (
  <InnerTable
    headers={["Method", "Use when"]}
    rows={[
      [
        <Link
          key="uc"
          href="https://react-hook-form.com/docs/usecontroller"
          className="font-mono underline text-fd-primary"
        >
          useController()
        </Link>,
        <>
          When you also need fieldState (e.g. invalid, error) or formState along
          with field bindings. Useful for component-specific styling or aria
          attributes.
        </>,
      ],
    ]}
  />
);

// ─── individual row ───────────────────────────────────────────────────────────
function Row({
  parentId,
  entry,
}: {
  parentId: string;
  entry: RowEntry & { id: string };
}) {
  const [open, setOpen] = useState(false);
  const domId = `${parentId}-${entry.id}`;

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    if (`#${domId}` === hash) setOpen(true);
  }, [domId]);

  if (!entry.detail) {
    // plain non-collapsible row
    return (
      <div
        className={cn(
          "rounded-xl border border-transparent px-3 pe-8 py-2 not-prose",
          rowGrid,
        )}
        style={{ gridTemplateColumns: tableGridTemplate }}
      >
        <span className="text-sm">{entry.scenario}</span>
        <span className="text-sm text-fd-muted-foreground">
          {entry.methods}
        </span>
        <span className="text-sm text-fd-muted-foreground">{entry.where}</span>
      </div>
    );
  }

  return (
    <Collapsible
      id={domId}
      open={open}
      onOpenChange={(value) => {
        if (value) window.history.replaceState(null, "", `#${domId}`);
        setOpen(value);
      }}
      className={cn(
        "rounded-xl border overflow-hidden scroll-m-20 transition-all",
        open
          ? "shadow-sm bg-fd-background not-last:mb-2"
          : "border-transparent",
      )}
    >
      <CollapsibleTrigger
        className={cn(
          "group relative w-full text-start px-3 pe-8 py-2 not-prose hover:bg-fd-accent",
          rowGrid,
        )}
        style={{ gridTemplateColumns: tableGridTemplate }}
      >
        <span className="text-sm font-medium">{entry.scenario}</span>
        <span className="text-sm text-fd-muted-foreground">
          {entry.methods}
        </span>
        <span className="text-sm text-fd-muted-foreground">{entry.where}</span>
        <ChevronDown className="absolute end-2 top-3 size-4 text-fd-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-3 border-t border-fd-border overflow-auto fd-scroll-container">
          {entry.detail}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// ─── main exported table ──────────────────────────────────────────────────────
const ROWS: (RowEntry & { id: string })[] = [
  {
    id: "on-submit",
    scenario: "Get validated data after the user submits",
    methods: (
      <code className="underline underline-offset-2">
        <a href="/docs/react/form-control#1-onsubmit">onSubmit</a>
      </code>
    ),
    where: "AutoForm prop",
  },
  {
    id: "form-data",
    scenario: "Access or subscribe to form data and states",
    methods: (
      <code>
        useWatch, useForm methods like watch, subscribe, formState, getValues
        via useFormContext
      </code>
    ),
    where: "Inside AutoForm",
    detail: FormDataDetail,
  },
  {
    id: "external-control",
    scenario: "Control or read the form from outside AutoForm",
    methods: <code>createFormControl</code>,
    where: "Parent component",
  },
  {
    id: "field-registration",
    scenario: "Connect a custom field input",
    methods: <code>useController</code>,
    where: "Inside field component",
    detail: FieldRegistrationDetail,
  },
];

export function FormControlReferenceTable() {
  const id = "form-control-reference-table";
  return (
    <div
      id={id}
      className="@container flex flex-col p-1 bg-fd-card text-fd-card-foreground rounded-2xl border my-6 text-sm overflow-hidden"
    >
      {/* header */}
      <div
        className={cn(
          "px-3 pe-8 py-1 not-prose text-fd-muted-foreground font-medium",
          headerGrid,
        )}
        style={{ gridTemplateColumns: tableGridTemplate }}
      >
        <p>Scenario</p>
        <p>Method(s)</p>
        <p>Where</p>
      </div>

      {ROWS.map((row) => (
        <Row key={row.id} parentId={id} entry={row} />
      ))}
    </div>
  );
}
