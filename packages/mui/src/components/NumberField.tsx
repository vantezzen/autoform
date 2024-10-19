import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  error,
  inputProps,
}) => <Input type="number" error={!!error} fullWidth {...inputProps} />;
