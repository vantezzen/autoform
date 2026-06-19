import React from "react";
import { useFieldArray } from "react-hook-form";
import { getLabel, ParsedField } from "@acp-autoform/core";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "../context";
import { useRegister } from "./utils";
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
  const defaultValue = getArrayItemDefaultValue(parsedField);

  return (
    <uiComponents.ArrayWrapper
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
        <uiComponents.ArrayElementWrapper
          key={item.id}
          onRemove={() => remove(index)}
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
