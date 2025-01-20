import React from "react";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "./context";
import { getLabel, ParsedField } from "@autoform/core";
import { Control } from "react-hook-form";

export const ObjectField: React.FC<{
  field: ParsedField;
  path: string[];
  control: Control;
  getObjectValue: any;
}> = ({ field, path, control, getObjectValue }) => {
  const { uiComponents } = useAutoForm();

  return (
    <uiComponents.ObjectWrapper
      control={control}
      label={getLabel(field)}
      field={field}
      getObjectValue={getObjectValue}
    >
      {Object.values(field.schema!).map((subField) => (
        <AutoFormField
          key={`${path.join(".")}.${subField.key}`}
          field={subField}
          path={[...path, subField.key]}
        />
      ))}
    </uiComponents.ObjectWrapper>
  );
};
