import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const formField = useField();
  return <Input id={id} key={id} fullWidth {...inputProps} {...formField} />;
};
