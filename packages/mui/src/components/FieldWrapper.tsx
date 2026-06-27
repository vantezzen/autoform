import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { FieldWrapperProps } from "@dual-autoform/react";

const DISABLED_LABELS = ["boolean", "date", "object", "array"];
const DISABLE_HELPER_TEXT = ["object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  id,
  parsedField,
}) => {
  const isDisabled = DISABLED_LABELS.includes(parsedField.type);
  const hideHelperText = DISABLE_HELPER_TEXT.includes(parsedField.type);

  return (
    <FormControl
      fullWidth
      margin="normal"
      error={!!error}
      required={parsedField.required}
    >
      {!isDisabled && <InputLabel htmlFor={id}>{label}</InputLabel>}
      {children}
      {!hideHelperText && parsedField.fieldConfig?.description && (
        <FormHelperText>{parsedField.fieldConfig.description}</FormHelperText>
      )}
      {!hideHelperText && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
