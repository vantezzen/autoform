import React from "react";
import { getLabel } from "@autoform/core";
import type { ParsedField } from "@autoform/core";
import { useAutoForm } from "../context";
import { AutoFormField } from "./AutoFormField";

export const ObjectField: React.FC<{
  parsedField: ParsedField;
  path: string[];
}> = ({ path, parsedField }) => {
  const { uiComponents } = useAutoForm();
  const ObjectWrapper =
    parsedField.fieldConfig?.objectWrapper || uiComponents.ObjectWrapper;

  return (
    <ObjectWrapper label={getLabel(parsedField)} parsedField={parsedField}>
      {parsedField.schema!.map((subField) => (
        <AutoFormField
          key={`${path.join(".")}.${subField.key}`}
          parsedField={subField}
          path={[...path, subField.key]}
        />
      ))}
    </ObjectWrapper>
  );
};
