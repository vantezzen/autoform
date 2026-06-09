import React from "react";
import { ObjectWrapperProps } from "@acp-autoform/react";
import { FormHelperText, Box, Typography } from "@mui/material";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
  parsedField,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">{label}</Typography>
      {parsedField.fieldConfig?.description && (
        <FormHelperText variant="standard">
          {parsedField.fieldConfig.description}
        </FormHelperText>
      )}
      {children}
    </Box>
  );
};
