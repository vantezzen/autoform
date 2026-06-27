import React from "react";
import { getLabel } from "@dual-autoform/core";
import type { ParsedField } from "@dual-autoform/core";
import { useAutoForm } from "../context";
import { AutoFormField } from "./AutoFormField";
import { useFieldContext } from "./hooks";
import { getArrayItemDefaultValue } from "../utils";
import { focusFirstFieldInPath } from "./utils";

export const ArrayField: React.FC<{
  id: string;
  path: string[];
  inputProps: any;
  parsedField: ParsedField;
  error?: string;
}> = ({ id, path, inputProps, error, parsedField }) => {
  const { uiComponents } = useAutoForm();
  const field = useFieldContext() as any;
  const ArrayWrapper =
    parsedField.fieldConfig?.arrayWrapper || uiComponents.ArrayWrapper;
  const ArrayElementWrapper =
    parsedField.fieldConfig?.arrayElementWrapper ||
    uiComponents.ArrayElementWrapper;
  const defaultValue = getArrayItemDefaultValue(parsedField);

  const addItem = () => {
    const itemPath = [...path, field.state.value?.length ?? 0].join(".");
    field.pushValue(defaultValue);

    setTimeout(() => {
      focusFirstFieldInPath(itemPath);
      // void field.form.validate("change");
    });
  };

  return (
    <ArrayWrapper
      error={error}
      parsedField={parsedField}
      inputProps={{ key: `${id}-input`, ...inputProps }}
      label={getLabel(parsedField)}
      onAddItem={addItem}
    >
      {field.state.value?.map((_item: any, index: number) => (
        <ArrayElementWrapper
          key={index}
          onRemove={() => field.removeValue(index)}
          index={index}
        >
          <AutoFormField
            parsedField={parsedField.schema![0]!}
            path={[...path, index.toString()]}
          />
        </ArrayElementWrapper>
      ))}
    </ArrayWrapper>
  );
};
