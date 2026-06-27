import React from "react";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "../context";
import { getLabel, ParsedField } from "@dual-autoform/core";

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
