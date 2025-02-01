import { ObjectWrapperProps } from "@autoform/react";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <Box w={"full"} marginTop={"1"}>
      <Heading size={"lg"} fontWeight={"semibold"} marginBottom={"-2"}>
        {label}
      </Heading>
      {children}
    </Box>
  );
};
