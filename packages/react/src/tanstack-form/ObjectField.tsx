import React from "react";
import type { ReactFormExtendedApi } from "@tanstack/react-form";
import { getLabel } from "@acp-autoform/core";
import type { ParsedField } from "@acp-autoform/core";
import { useAutoForm } from "../context";
import { AutoFormField } from "./AutoFormField";

type FormApi = ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>;

export const ObjectField: React.FC<{
  parsedField: ParsedField;
  path: string[];
  form: FormApi;
}> = ({ path, parsedField, form }) => {
  const { uiComponents } = useAutoForm();

  return (
    <uiComponents.ObjectWrapper
      label={getLabel(parsedField)}
      parsedField={parsedField}
    >
      {Object.entries(parsedField.schema!).map(([_key, subField]) => {
        const sf = subField as ParsedField;
        return (
          <AutoFormField
            key={`${path.join(".")}.${sf.key}`}
            parsedField={sf}
            path={[...path, sf.key]}
            form={form}
          />
        );
      })}
    </uiComponents.ObjectWrapper>
  );
};
