import React from "react";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "./context";
import { getLabel, ParsedField } from "@autoform/core";

export const ObjectField: React.FC<{
  field: ParsedField;
  path: string[];
}> = ({ field, path }) => {
  const { uiComponents } = useAutoForm();

  return (
    <uiComponents.ObjectWrapper
      label={getLabel(field)}
      field={field}
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
