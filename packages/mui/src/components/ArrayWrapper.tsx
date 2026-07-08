import React from "react";
import { Button, Box, Typography, FormHelperText } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import type { ArrayWrapperProps } from "@autoform/react";

function AddIcon() {
  return (
    <SvgIcon data-testid="AddIcon">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </SvgIcon>
  );
}

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
        type="button"
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
