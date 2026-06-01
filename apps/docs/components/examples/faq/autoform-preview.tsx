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
import { cn } from "@/lib/utils";

const PreviewUIComponents: AutoFormUIComponents = {
  Form: React.forwardRef<HTMLFormElement, React.ComponentProps<"form">>(
    ({ children, className, ...props }, ref) => (
      <form ref={ref} className={cn("space-y-4", className)} {...props}>
        {children}
      </form>
    ),
  ),
  FieldWrapper: ({ id, label, field, error, children }: FieldWrapperProps) => {
    const hideLabel = ["boolean", "object", "array"].includes(field.type);
    const hideHelperText = ["object", "array"].includes(field.type);

    return (
      <div className="space-y-2">
        {!hideLabel && (
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
  ErrorMessage: ({ error }: { error: string }) => (
    <Alert variant="destructive">
      <AlertCircle className="mt-2 h-5 w-5" />
      <AlertTitle className="text-sm/5">{error}</AlertTitle>
    </Alert>
  ),
  SubmitButton: ({ children }: { children: React.ReactNode }) => (
    <Button type="submit">{children}</Button>
  ),
  ObjectWrapper: ({ label, field, children }: ObjectWrapperProps) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium">{label}</h3>
        {field.fieldConfig?.description && (
          <p className="text-sm text-muted-foreground">
            {field.fieldConfig.description}
          </p>
        )}
      </div>
      {children}
    </div>
  ),
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
            className={cn(
              "rounded-md px-2 py-1 text-base font-medium focus:outline-none",
              error &&
                "focus:border focus:border-destructive focus:ring-1 focus:ring-destructive/50",
            )}
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
              id={`${key}-description`}
            >
              {field.fieldConfig.description}
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive" id={`${key}-error`}>
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
          Add
        </Button>
      </div>
    );
  },
  ArrayElementWrapper: ({ children, onRemove }: ArrayElementWrapperProps) => (
    <div className="relative mt-2 rounded-md border p-4">
      <Button
        onClick={onRemove}
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2"
        type="button"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
      {children}
    </div>
  ),
};

const PreviewFieldComponents = {
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
  boolean: ({ id, field, label, useField, inputProps }: AutoFormFieldProps) => {
    const formField = useField();

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          {...inputProps}
          {...formField}
          checked={formField.value}
          onCheckedChange={formField.onChange}
        />
        <Label htmlFor={id}>
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </Label>
      </div>
    );
  },
  select: ({ field, useField, inputProps, error, id }: AutoFormFieldProps) => {
    const formField = useField();
    const { value, onChange, ...formFieldRest } = formField;

    return (
      <Select
        onValueChange={onChange}
        value={value}
        {...formFieldRest}
        {...inputProps}
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
