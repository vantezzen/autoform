import React from "react";
import { ObjectWrapperProps } from "@acp-autoform/react";
import { FormHelperText, Box, Typography } from "@mui/material";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  field,
  children,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">{label}</Typography>
      {field.fieldConfig?.description && (
        <FormHelperText variant="standard">
          {field.fieldConfig.description}
        </FormHelperText>
      )}
      {children}
    </Box>
  );
};
