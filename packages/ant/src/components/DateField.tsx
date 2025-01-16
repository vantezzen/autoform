import React from "react";
import { DatePicker } from "antd";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";
import dateFnsGenerateConfig from "rc-picker/es/generate/dateFns";

// use ant-design date-picker of dayjs will be error,so use other library to generate picker
const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  value,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <MyDatePicker
      id={id}
      key={key}
      {...props}
      {...formField}
      style={{ width: "100%" }}
      // DatePicker can't use value is string
      value={
        typeof formField.value === "string"
          ? new Date(formField.value)
          : formField.value
      }
      // z.coerce use ISO.string
      onChange={(date) => {
        formField.onChange(date.toISOString());
      }}
      // use allowClear have bug
      allowClear={false}
    />
  );
};
