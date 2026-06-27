import { ObjectWrapperProps } from "@dual-autoform/react";
import { Box, FieldHelperText, Heading } from "@chakra-ui/react";
import React from "react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
  parsedField,
}) => {
  return (
    <Box w={"full"} marginTop={"1"}>
      <Heading size={"lg"} fontWeight={"semibold"} marginBottom={"-1"}>
        {label}
      </Heading>
      {parsedField.fieldConfig?.description && (
        <FieldHelperText>{parsedField.fieldConfig.description}</FieldHelperText>
      )}
      {children}
    </Box>
  );
};
