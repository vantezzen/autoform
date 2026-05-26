import React from "react";
import { DatePicker } from "antd";
import { AutoFormFieldProps } from "@autoform/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const { ref, ...formField } = useField();

  return (
    <DatePicker
      ref={ref}
      id={id}
      key={id}
      {...inputProps}
      {...formField}
      style={{ width: "100%" }}
      value={formField.value ? dayjs.utc(formField.value) : undefined}
      onChange={(date, dateString) => {
        formField.onChange(dateString);
      }}
      // use allowClear have bug
      allowClear={false}
    />
  );
};
