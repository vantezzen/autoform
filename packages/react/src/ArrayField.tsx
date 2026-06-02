import React from "react";
import { useFieldArray } from "react-hook-form";
import { getLabel, ParsedField } from "@acp-autoform/core";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "./context";
import { useRegister } from "./utils";

export const ArrayField: React.FC<{
  id: string;
  path: string[];
  inputProps: any;
  field: ParsedField;
  error?: string | undefined;
}> = ({ id, path, inputProps, field, error }) => {
  const { uiComponents } = useAutoForm();
  const { fields, append, remove } = useFieldArray({
    name: path.join("."),
  });
  const ref = useRegister(path.join(".")).ref;

  const subFieldType = field.schema?.[0]?.type;
  let defaultValue: any;
  if (subFieldType === "object") {
    defaultValue = {};
  } else if (subFieldType === "array") {
    defaultValue = [];
  } else {
    defaultValue = null;
  }

  return (
    <uiComponents.ArrayWrapper
      error={error}
      field={field}
      inputProps={{
        key: `${id}-input`,
        ...inputProps,
        ref: ref,
      }}
      label={getLabel(field)}
      onAddItem={() => append(defaultValue)}
    >
      {fields.map((item, index) => (
        <uiComponents.ArrayElementWrapper
          key={item.id}
          onRemove={() => remove(index)}
          index={index}
        >
          <AutoFormField
            field={field.schema![0]!}
            path={[...path, index.toString()]}
          />
        </uiComponents.ArrayElementWrapper>
      ))}
    </uiComponents.ArrayWrapper>
  );
};
