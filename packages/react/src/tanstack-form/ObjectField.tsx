import React from "react";
import { getLabel } from "@acp-autoform/core";
import type { ParsedField } from "@acp-autoform/core";
import { useAutoForm } from "@acp-autoform/react";
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
      {Object.entries(parsedField.schema!).map(([_key, subField]) => {
        const sf = subField as ParsedField;
        return (
          <AutoFormField
            key={`${path.join(".")}.${sf.key}`}
            parsedField={sf}
            path={[...path, sf.key]}
          />
        );
      })}
    </ObjectWrapper>
  );
};
