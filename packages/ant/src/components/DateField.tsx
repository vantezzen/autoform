import { AutoFormFieldProps } from "@autoform/react";
import { DatePicker } from "antd";
import dateFnsGenerateConfig from "rc-picker/es/generate/dateFns";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useObjectContext } from "../Context/Object";
import { onChange } from "../utils";

// use ant-design date-picker of dayjs will be error,so use other library to generate picker
const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export const DateField: React.FC<AutoFormFieldProps> = ({
  field,
  control,
  path,
  inputProps,
}) => {
  const controls = useObjectContext();
  const { setValue } = useFormContext();

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
          {...inputProps}
          // z.coerce use IOS.sting
          onChange={(date) => {
            onChange({
              path,
              event: date.toISOString(),
              field: fields,
              setValue,
              controls,
              type: "date",
            });
            // if inputProps?.onChange is a function, call it
            inputProps?.onChange?.({ target: { value: date.toISOString() } });
          }}
          // use allowClear have bug when use zod
          allowClear={false}
        />
      )}
    />
  );
};
