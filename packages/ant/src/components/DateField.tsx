import { AutoFormFieldProps } from "@autoform/react";
import { DatePicker } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

export const DateField: React.FC<AutoFormFieldProps> = ({ field, control }) => {
  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.default}
      render={({ field }) => {
        return <DatePicker mode="date" style={{ width: "100%" }} {...field} />;
      }}
    />
  );
};
