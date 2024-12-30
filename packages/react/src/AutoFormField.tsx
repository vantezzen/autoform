import React from "react";
import { useFormContext } from "react-hook-form";
import { useAutoForm } from "./context";
import { getLabel, ParsedField } from "@autoform/core";
import { ObjectField } from "./ObjectField";
import { ArrayField } from "./ArrayField";
import { AutoFormFieldProps } from "./types";
import { getPathInObject } from "./utils";

export const AutoFormField: React.FC<{
  field: ParsedField;
  path: string[];
}> = ({ field, path }) => {
  const { formComponents, uiComponents } = useAutoForm();
  const {
    register,
    formState: { errors },
    getValues,
    control,
  } = useFormContext();

  const fullPath = path.join(".");
  const error = getPathInObject(errors, path)?.message as string | undefined;
  const value = getValues(fullPath);

  const FieldWrapper =
    field.fieldConfig?.fieldWrapper || uiComponents.FieldWrapper;

  let FieldComponent: React.ComponentType<AutoFormFieldProps> = () => (
    <uiComponents.ErrorMessage
      error={`[AutoForm Configuration Error] No component found for type "${field.type}" nor a fallback`}
    />
  );

  if (field.type === "array") {
    FieldComponent = ArrayField;
  } else if (field.type === "object") {
    FieldComponent = ObjectField;
  } else if (field.type in formComponents) {
    FieldComponent = formComponents[field.type as keyof typeof formComponents]!;
  } else if ("fallback" in formComponents) {
    FieldComponent = formComponents.fallback;
  }

  return (
    <FieldWrapper
      label={getLabel(field)}
      error={error}
      id={fullPath}
      field={field}
      // add path to the props from antd-design
      path={path}
    >
      <FieldComponent
        label={getLabel(field)}
        getObjectValue={getValues}
        field={field}
        value={value}
        error={error}
        id={fullPath}
        key={fullPath}
        path={path}
        // add control to the props from antd-design
        control={control}
        inputProps={{
          required: field.required,
          error: error,
          key: `${fullPath}-input`,
          ...field.fieldConfig?.inputProps,
          ...register(fullPath),
        }}
      />
    </FieldWrapper>
  );
};
