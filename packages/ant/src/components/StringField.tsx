import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { useObjectContext } from "../Context/Object";
export const StringField: React.FC<AutoFormFieldProps> = ({
  // error,
  // id,
  field,
  control,
  inputProps,
  path,
}) => {
  const controls = useObjectContext();
  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.default}
      render={({ field }) => (
        <Input
          key={inputProps.key}
          style={{ width: "100%" }}
          {...field}
          onChange={(e) => {
            // if not children Items
            if (path.length === 1) return field.onChange(e);
            // if children Items

            // check if children Items
            const findPath = path.findIndex((item) => item === field.name);
            // no children Items
            if (findPath === 1)
              return controls?.control?.onChange({
                ...controls.getValues(controls?.label),
                [field.name]: e.target.value,
              });
            const a = path.slice(1).reduce((acc, item) => {
              console.log(acc, itemitem);
              if (item === field.name) {
                acc[item] = e.target.value;
                return acc;
              }
              acc[item] = {};
              return acc;
            }, {});
            console.log(a);
            controls?.control?.onChange(e.target.value);
            // const oldData = controls?.getValues(path[0]);
            // const obj: Record<string, string> = {};
            // for (let i = 1; i < path.length; i++) {
            //   if (path[i] === field.name) {
            //     obj[path[i] as keyof typeof obj] = e.target.value;
            //     continue;
            //   }
            // }
            // console.log(obj);
            // return controls?.control?.onChange({
            //   [path[0] as string]: {
            //     ...oldData,
            //     ...obj,
            //   },
            // });
          }}
          disabled={
            path.length > 1 ? controls?.control?.disabled : field.disabled
          }
        />
      )}
    />
  );
};
