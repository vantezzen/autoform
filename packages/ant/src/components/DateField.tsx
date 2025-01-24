import React from "react";
import { DatePicker } from "antd";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <DatePicker
      id={id}
      key={key}
      {...props}
      {...formField}
      style={{ width: "100%" }}
      // Ignore ts and eslint error when giving date as string in defaultValues 
      // DatePicker can't use string value
      value={
        dayjs.utc(formField.value)
      }
      onChange={(date, dateString) => {
        formField.onChange(dateString);
      }}
      // use allowClear have bug
      allowClear={false}
    />
  );
};
