import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography, FormHelperText } from "@mui/material";
import { ArrayWrapperProps } from "@dual-autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  error,
  children,
  onAddItem,
  inputProps,
  parsedField,
}) => {
  const { key, ref, "aria-invalid": ariaInvalid, ...props } = inputProps;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        ref={ref}
        tabIndex={-1}
        aria-invalid={ariaInvalid}
        aria-describedby={`${key}-error ${key}-description`}
        sx={{
          "&:focus-visible": {
            outline: "2px solid color-mix(in srgb, Highlight 50%, transparent)",
            outlineOffset: "5px",
            borderRadius: "5px",
          },
        }}
      >
        {label}
        {parsedField.required && <span style={{ opacity: 0.8 }}> * </span>}
      </Typography>
      {parsedField.fieldConfig?.description && (
        <FormHelperText variant="standard" id={key + "-description"}>
          {parsedField.fieldConfig.description}
        </FormHelperText>
      )}
      {error && (
        <FormHelperText variant="standard" id={key + "-error"}>
          {error}
        </FormHelperText>
      )}
      {children}
      <Button
        {...props}
        sx={{ my: 1 }}
        variant="outlined"
        onClick={(e) => {
          e.currentTarget.blur();
          onAddItem();
        }}
        aria-label={`add ${label}`}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};
