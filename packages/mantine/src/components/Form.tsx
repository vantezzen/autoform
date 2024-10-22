import React from "react";
import { Box } from "@mantine/core";

export const Form = React.forwardRef<
  HTMLFormElement,
  React.ComponentProps<"form">
>(({ children, ...props }, ref) => {
  return (
    <Box
      component="form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
      ref={ref}
      {...props}
    >
      {children}
    </Box>
  );
});
