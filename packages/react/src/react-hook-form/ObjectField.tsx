import React from "react";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "../context";
import { getLabel, ParsedField } from "@acp-autoform/core";

export const ObjectField: React.FC<{
  parsedField: ParsedField;
  path: string[];
}> = ({ path, parsedField }) => {
  const { uiComponents } = useAutoForm();

  return (
    <uiComponents.ObjectWrapper
      label={getLabel(parsedField)}
      parsedField={parsedField}
    >
      {Object.entries(parsedField.schema!).map(([_key, subField]) => (
        <AutoFormField
          key={`${path.join(".")}.${subField.key}`}
          parsedField={subField}
          path={[...path, subField.key]}
        />
      ))}
    </uiComponents.ObjectWrapper>
  );
};
