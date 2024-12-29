import { AutoFormFieldProps } from "@autoform/react";
import { DatePicker } from "antd";
import { format, formatISO } from "date-fns";
import dateFnsGenerateConfig from "rc-picker/es/generate/dateFns";
import React from "react";
import { Controller } from "react-hook-form";

// use ant-design date-picker of dayjs will be error,so use other library to generate picker
const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export const DateField: React.FC<AutoFormFieldProps> = ({ field, control }) => {
  return (
    <Controller
      name={field.key}
      control={control}
      render={({ field: fields }) => (
        <MyDatePicker
          style={{ width: "100%" }}
          {...fields}
          {...field}
          key={field.key}
          // DatePicker can't use value is string
          value={
            typeof fields.value === "string"
              ? new Date(fields.value)
              : fields.value
          }
          // z.coerce use IOS.sting
          onChange={(date) => {
            fields.onChange(date.toISOString());
          }}
          // use allowClear have bug when use zod
          allowClear={false}
        />
      )}
    />
  );
};
