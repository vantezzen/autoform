import React from "react";
import { Field as ChakraField } from "@chakra-ui/react";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
  if (!error) return null;
  return (
    <ChakraField.Root invalid={!!error}>
      {error && <ChakraField.ErrorText>{error}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
};
