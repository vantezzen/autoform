import React from "react";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "../context";
import { getLabel } from "@autoform/core";
import type { ParsedField } from "@autoform/core";

export const ObjectField: React.FC<{
  parsedField: ParsedField;
  path: string[];
}> = ({ path, parsedField }) => {
  const { uiComponents } = useAutoForm();
  const ObjectWrapper =
    parsedField.fieldConfig?.objectWrapper || uiComponents.ObjectWrapper;

  return (
    <ObjectWrapper label={getLabel(parsedField)} parsedField={parsedField}>
      {Object.entries(parsedField.schema!).map(([_key, subField]) => (
        <AutoFormField
          key={`${path.join(".")}.${subField.key}`}
          parsedField={subField}
          path={[...path, subField.key]}
        />
      ))}
    </ObjectWrapper>
  );
};
