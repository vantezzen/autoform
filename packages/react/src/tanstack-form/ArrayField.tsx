import React from "react";
import { useField, type ReactFormExtendedApi } from "@tanstack/react-form";
import { getLabel } from "@acp-autoform/core";
import type { ParsedField } from "@acp-autoform/core";
import { useAutoForm } from "../context";
import { AutoFormField } from "./AutoFormField";
import { fieldContext } from "./AutoForm";

import { formatTanStackPath } from "./utils";

type FormApi = ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>;

export const ArrayField: React.FC<{
  id: string;
  path: string[];
  inputProps: any;
  parsedField: ParsedField;
  error?: string;
  form: FormApi;
}> = ({ id, path, inputProps, error, parsedField, form }) => {
  const { uiComponents } = useAutoForm();
  const fieldPath = formatTanStackPath(path);

  const buildDefaultItem = (field: ParsedField): any => {
    if (field.type === "object") {
      const obj: any = {};
      if (field.schema) {
        for (const child of field.schema) {
          if (child.type === "object" || child.type === "array") {
            obj[child.key] = buildDefaultItem(child);
          }
        }
      }
      return obj;
    } else if (field.type === "array") {
      return [];
    }
    return null;
  };

  const defaultValue = parsedField.schema?.[0] ? buildDefaultItem(parsedField.schema[0]) : null;
  console.log("DEFAULT VALUE GENERATED:", defaultValue);

  const arrayField = useField({ form, name: fieldPath as any, mode: "array" });

  return (
    <fieldContext.Provider value={arrayField as any}>
          <uiComponents.ArrayWrapper
            error={error}
            parsedField={parsedField}
            inputProps={{ key: `${id}-input`, ...inputProps }}
            label={getLabel(parsedField)}
            onAddItem={() => arrayField.pushValue(defaultValue)}
          >
            {(arrayField.state.value as any[])?.map((_item: any, index: number) => (
              <uiComponents.ArrayElementWrapper
                key={index}
                onRemove={() => arrayField.removeValue(index)}
                index={index}
              >
                <AutoFormField
                  parsedField={parsedField.schema![0]!}
                  path={[...path, index.toString()]}
                  form={form}
                />
              </uiComponents.ArrayElementWrapper>
            ))}
      </uiComponents.ArrayWrapper>
    </fieldContext.Provider>
  );
};
