import React from "react";
import { DatePicker } from "antd";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const DateField: React.FC<AutoFormFieldProps> = ({ id, inputProps }) => {
  const { ref, ...field } = useField({ name: id }).field;

  return (
    <DatePicker
      ref={ref}
      id={id}
      key={id}
      {...inputProps}
      {...field}
      style={{ width: "100%" }}
      value={field.value ? dayjs.utc(field.value) : undefined}
      onChange={(date, dateString) => {
        field.onChange(dateString);
      }}
      // use allowClear have bug
      allowClear={false}
    />
  );
};
