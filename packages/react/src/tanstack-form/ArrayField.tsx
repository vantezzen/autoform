import React from "react";
import { getLabel } from "@acp-autoform/core";
import type { ParsedField } from "@acp-autoform/core";
import { useAutoForm } from "../context";
import { AutoFormField } from "./AutoFormField";
import { useFieldContext } from "./form-context";
import { getArrayItemDefaultValue } from "../utils";

export const ArrayField: React.FC<{
  id: string;
  path: string[];
  inputProps: any;
  parsedField: ParsedField;
  error?: string;
}> = ({ id, path, inputProps, error, parsedField }) => {
  const { uiComponents } = useAutoForm();
  const field = useFieldContext() as any;
  const defaultValue = getArrayItemDefaultValue(parsedField);

  return (
    <uiComponents.ArrayWrapper
      error={error}
      parsedField={parsedField}
      inputProps={{ key: `${id}-input`, ...inputProps }}
      label={getLabel(parsedField)}
      onAddItem={() => field.pushValue(defaultValue)}
    >
      {field.state.value?.map((_item: any, index: number) => (
        <uiComponents.ArrayElementWrapper
          key={index}
          onRemove={() => field.removeValue(index)}
          index={index}
        >
          <AutoFormField
            parsedField={parsedField.schema![0]!}
            path={[...path, index.toString()]}
          />
        </uiComponents.ArrayElementWrapper>
      ))}
    </uiComponents.ArrayWrapper>
  );
};
