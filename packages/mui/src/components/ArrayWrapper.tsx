import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography, FormHelperText } from "@mui/material";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  error,
  children,
  onAddItem,
  inputProps,
}) => {
  const { key, ref, ...props } = inputProps;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        ref={ref}
        tabIndex={-1}
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
        {field.required && <span style={{ opacity: 0.8 }}> * </span>}
      </Typography>
      {field.fieldConfig?.description && (
        <FormHelperText variant="standard" id={key + "-description"}>
          {field.fieldConfig.description}
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
        onClick={onAddItem}
        aria-label={`add ${label}`}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};
