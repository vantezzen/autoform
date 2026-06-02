"use client";

import React from "react";
import {
  AutoForm as BaseAutoForm,
  AutoFormFieldProps,
  AutoFormUIComponents,
  ArrayElementWrapperProps,
  ArrayWrapperProps,
  ExtendableAutoFormProps,
  FieldWrapperProps,
  FieldValues,
  ObjectWrapperProps,
} from "@autoform/react";
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
  FieldWrapper: ({ id, label, field, error, children }: FieldWrapperProps) => {
    const isDisabled = DISABLED_LABELS.includes(field.type);
    const hideHelperText = DISABLE_HELPER_TEXT.includes(field.type);

    return (
      <div className="flex flex-col gap-2">
        {!isDisabled && (
          <Label htmlFor={id}>
            {label}
            {field.required && <span className="text-destructive"> *</span>}
          </Label>
        )}
        {children}
        {!hideHelperText && field.fieldConfig?.description && (
          <p className="text-sm text-muted-foreground">
            {field.fieldConfig.description}
          </p>
        )}
        {!hideHelperText && error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  },

  // Matches shadcn ErrorMessage.tsx exactly
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
  ObjectWrapper: ({ label, field, children }: ObjectWrapperProps) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{label}</h3>
        {field.fieldConfig?.description && (
          <p className="text-sm text-muted-foreground">
            {field.fieldConfig.description}
          </p>
        )}
      </div>
      {children}
    </div>
  ),

  // Matches shadcn ArrayWrapper.tsx exactly – template-literal className, no "Add" text
  ArrayWrapper: ({
    label,
    field,
    error,
    children,
    onAddItem,
    inputProps,
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
            {field.required && <span className="text-destructive"> *</span>}
          </h3>
          {field.fieldConfig?.description && (
            <p
              className="text-sm text-muted-foreground"
              id={key + "-description"}
            >
              {field.fieldConfig.description}
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive" id={key + "-error"}>
              {error}
            </p>
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
  string: ({ useField, inputProps, error, id }: AutoFormFieldProps) => {
    const formField = useField();
    const { value, ...rest } = formField;

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
  number: ({ useField, inputProps, error, id }: AutoFormFieldProps) => {
    const formField = useField();

    return (
      <Input
        id={id}
        type="number"
        className={error ? "border-destructive" : ""}
        {...inputProps}
        {...formField}
      />
    );
  },

  // Matches shadcn BooleanField.tsx exactly – no mt-4, has Enter key handler
  boolean: ({ id, field, label, useField, inputProps }: AutoFormFieldProps) => {
    const formField = useField();

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
          {...formField}
          checked={formField.value}
          onCheckedChange={formField.onChange}
          onKeyDown={handleKeyDown}
        />
        <Label htmlFor={id}>
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </Label>
      </div>
    );
  },

  // Matches shadcn DateField.tsx exactly – was missing before
  date: ({ useField, inputProps, error, id }: AutoFormFieldProps) => {
    const formField = useField();

    return (
      <Input
        id={id}
        type="date"
        className={error ? "border-destructive" : ""}
        {...inputProps}
        {...formField}
      />
    );
  },

  // Matches shadcn SelectField.tsx exactly – inputProps before formFieldRest
  select: ({ field, useField, inputProps, error, id }: AutoFormFieldProps) => {
    const formField = useField();
    const { value, onChange, ...formFieldRest } = formField;

    return (
      <Select
        onValueChange={onChange}
        value={value}
        {...inputProps}
        {...formFieldRest}
      >
        <SelectTrigger
          id={id}
          {...formField}
          className={error ? "border-destructive" : ""}
        >
          <SelectValue
            placeholder={inputProps?.placeholder ?? "Select an option"}
          />
        </SelectTrigger>
        <SelectContent>
          {(field.options || []).map(([key, label], index) => (
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

export function PreviewAutoForm<T extends FieldValues>({
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
