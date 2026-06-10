"use client";
import { useController } from "react-hook-form";

import React from "react";
import {
  AutoFormFieldProps,
  AutoFormUIComponents,
  ArrayElementWrapperProps,
  ArrayWrapperProps,
  ExtendableAutoFormProps,
  FieldWrapperProps,
  ObjectWrapperProps,
} from "@acp-autoform/react";
import { AutoForm as BaseAutoForm } from "@acp-autoform/react/react-hook-form";
import { AlertCircle, PlusIcon, TrashIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── UI Components ────────────────────────────────────────────────────────────

const DISABLED_LABELS = ["boolean", "object", "array"];
const DISABLE_HELPER_TEXT = ["object", "array"];

const PreviewUIComponents: AutoFormUIComponents = {
  // Matches shadcn Form.tsx exactly – className is NOT forwarded
  Form: React.forwardRef<HTMLFormElement, React.ComponentProps<"form">>(
    ({ children, ...props }, ref) => (
      <form ref={ref} className="flex flex-col gap-4" {...props}>
        {children}
      </form>
    ),
  ),
  // Matches shadcn FieldWrapper.tsx exactly
  FieldWrapper: ({
    id,
    label,
    error,
    children,
    parsedField,
  }: FieldWrapperProps) => {
    const isDisabled = DISABLED_LABELS.includes(parsedField.type);
    const hideHelperText = DISABLE_HELPER_TEXT.includes(parsedField.type);

    return (
      <div className="flex flex-col gap-2">
        {!isDisabled && (
          <Label htmlFor={id}>
            {label}
            {parsedField.required && (
              <span className="text-destructive"> *</span>
            )}
          </Label>
        )}
        {children}
        {!hideHelperText && parsedField.fieldConfig?.description && (
          <div className="text-sm text-muted-foreground">
            {parsedField.fieldConfig.description}
          </div>
        )}
        {!hideHelperText && error && (
          <div className="text-sm text-destructive">{error}</div>
        )}
      </div>
    );
  },
  ErrorMessage: ({ error }: { error: string }) => (
    <Alert variant="destructive">
      <AlertCircle className="h-5 w-5 mt-2" />
      <AlertTitle className="text-sm/5">{error}</AlertTitle>
    </Alert>
  ),

  // Matches shadcn SubmitButton.tsx exactly
  SubmitButton: ({ children }: { children: React.ReactNode }) => (
    <Button type="submit">{children}</Button>
  ),

  // Matches shadcn ObjectWrapper.tsx exactly – text-lg (not text-base)
  ObjectWrapper: ({ label, parsedField, children }: ObjectWrapperProps) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{label}</h3>
        {parsedField.fieldConfig?.description && (
          <div className="text-sm text-muted-foreground">
            {parsedField.fieldConfig.description}
          </div>
        )}
      </div>
      {children}
    </div>
  ),

  // Matches shadcn ArrayWrapper.tsx exactly – template-literal className, no "Add" text
  ArrayWrapper: ({
    label,
    error,
    children,
    onAddItem,
    inputProps,
    parsedField,
  }: ArrayWrapperProps) => {
    const { key, ref, ...props } = inputProps;

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          <h3
            className={`text-md font-medium focus:outline-none rounded-md px-2 py-1 transition-colors ${
              error
                ? "focus:border focus:border-destructive focus:ring-1 focus:ring-destructive/50"
                : ""
            }`}
            ref={ref}
            tabIndex={-1}
            aria-describedby={`${key}-error ${key}-description`}
          >
            {label}
            {parsedField.required && (
              <span className="text-destructive"> *</span>
            )}
          </h3>
          {parsedField.fieldConfig?.description && (
            <div
              className="text-sm text-muted-foreground"
              id={key + "-description"}
            >
              {parsedField.fieldConfig.description}
            </div>
          )}
          {error && (
            <div className="text-sm text-destructive" id={key + "-error"}>
              {error}
            </div>
          )}
        </div>
        {children}
        <Button
          {...props}
          size="sm"
          type="button"
          variant="outline"
          onClick={onAddItem}
          aria-label={`add ${label}`}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  },

  // Matches shadcn ArrayElementWrapper.tsx exactly
  ArrayElementWrapper: ({ children, onRemove }: ArrayElementWrapperProps) => (
    <div className="relative border p-4 rounded-md mt-2">
      <Button
        onClick={onRemove}
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2"
        type="button"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
      {children}
    </div>
  ),
};

// ── Field Components ─────────────────────────────────────────────────────────

const PreviewFieldComponents = {
  // Matches shadcn StringField.tsx exactly
  string: ({ inputProps, error, id }: AutoFormFieldProps) => {
    const { field } = useController({ name: id });
    const { value, ...rest } = field;

    return (
      <Input
        id={id}
        className={error ? "border-destructive" : ""}
        value={value ?? ""}
        {...inputProps}
        {...rest}
      />
    );
  },

  // Matches shadcn NumberField.tsx exactly
  number: ({ inputProps, error, id }: AutoFormFieldProps) => {
    const { field } = useController({ name: id });

    return (
      <Input
        id={id}
        type="number"
        className={error ? "border-destructive" : ""}
        {...inputProps}
        {...field}
      />
    );
  },

  // Matches shadcn BooleanField.tsx exactly – no mt-4, has Enter key handler
  boolean: ({ id, parsedField, label, inputProps }: AutoFormFieldProps) => {
    const { field } = useController({ name: id });

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        (
          document.querySelector('button[type="submit"]') as HTMLButtonElement
        )?.click();
      }
    };

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          {...inputProps}
          {...field}
          checked={field.value}
          onCheckedChange={field.onChange}
          onKeyDown={handleKeyDown}
        />
        <Label htmlFor={id}>
          {label}
          {parsedField.required && <span className="text-destructive"> *</span>}
        </Label>
      </div>
    );
  },

  // Matches shadcn DateField.tsx exactly – was missing before
  date: ({ inputProps, error, id }: AutoFormFieldProps) => {
    const { field } = useController({ name: id });

    return (
      <Input
        id={id}
        type="date"
        className={error ? "border-destructive" : ""}
        {...inputProps}
        {...field}
      />
    );
  },

  // Matches shadcn SelectField.tsx exactly – inputProps before formFieldRest
  select: ({ parsedField, inputProps, error, id }: AutoFormFieldProps) => {
    const { field } = useController({ name: id });
    const { value, onChange, ...formFieldRest } = field;

    return (
      <Select
        onValueChange={onChange}
        value={value}
        {...inputProps}
        {...formFieldRest}
      >
        <SelectTrigger
          id={id}
          {...field}
          className={error ? "border-destructive" : ""}
        >
          <SelectValue
            placeholder={inputProps?.placeholder ?? "Select an option"}
          />
        </SelectTrigger>
        <SelectContent>
          {(parsedField.options || []).map(([key, label], index) => (
            <SelectItem key={`${key}-${index}`} value={label}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
} as const;

// ── Export ───────────────────────────────────────────────────────────────────

export function PreviewAutoForm<T extends Record<string, any>>({
  uiComponents,
  formComponents,
  ...props
}: ExtendableAutoFormProps<T>) {
  return (
    <BaseAutoForm
      {...props}
      uiComponents={{ ...PreviewUIComponents, ...uiComponents }}
      formComponents={{ ...PreviewFieldComponents, ...formComponents }}
    />
  );
}
