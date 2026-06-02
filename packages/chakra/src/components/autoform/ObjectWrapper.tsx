import { ObjectWrapperProps } from "@acp-autoform/react";
import { Box, FieldHelperText, Heading } from "@chakra-ui/react";
import React from "react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  field,
  children,
}) => {
  return (
    <Box w={"full"} marginTop={"1"}>
      <Heading size={"lg"} fontWeight={"semibold"} marginBottom={"-1"}>
        {label}
      </Heading>
      {field.fieldConfig?.description && (
        <FieldHelperText>{field.fieldConfig.description}</FieldHelperText>
      )}
      {children}
    </Box>
  );
};
