import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AutoFormFieldProps } from "@autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  label,
  inputProps,
}) => <FormControlLabel control={<Checkbox {...inputProps} />} label={label} />;
