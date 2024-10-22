import React from "react";
import Box from "@mui/material/Box";

export const Form = React.forwardRef<
  HTMLFormElement,
  React.ComponentProps<"form">
>(({ children, ...props }, ref) => {
  return (
    <Box component="form" ref={ref} noValidate autoComplete="off" {...props}>
      {children}
    </Box>
  );
});
