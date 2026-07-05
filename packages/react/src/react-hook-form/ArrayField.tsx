import React from "react";
import { useFieldArray } from "react-hook-form";
import { getLabel } from "@autoform/core";
import type { ParsedField } from "@autoform/core";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "../context";
import { useRegister } from "./hooks";
import { getArrayItemDefaultValue } from "../utils";

export const ArrayField: React.FC<{
  id: string;
  path: string[];
  inputProps: any;
  parsedField: ParsedField;
  error?: string | undefined;
}> = ({ id, path, inputProps, error, parsedField }) => {
  const { uiComponents } = useAutoForm();
  const { fields, append, remove } = useFieldArray({
    name: path.join("."),
  });
  const ref = useRegister(path.join(".")).ref;
  const ArrayWrapper =
    parsedField.fieldConfig?.arrayWrapper || uiComponents.ArrayWrapper;
  const ArrayElementWrapper =
    parsedField.fieldConfig?.arrayElementWrapper ||
    uiComponents.ArrayElementWrapper;
  const defaultValue = getArrayItemDefaultValue(parsedField);

  return (
    <ArrayWrapper
      error={error}
      parsedField={parsedField}
      inputProps={{
        key: `${id}-input`,
        ...inputProps,
        ref: ref,
      }}
      label={getLabel(parsedField)}
      onAddItem={() => append(defaultValue)}
    >
      {fields.map((item, index) => (
        <ArrayElementWrapper
          key={item.id}
          onRemove={() => remove(index)}
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
