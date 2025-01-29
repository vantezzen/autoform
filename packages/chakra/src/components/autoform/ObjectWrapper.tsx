import { ObjectWrapperProps } from "@autoform/react";
import { Card, Stack } from "@chakra-ui/react";
import React from "react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{label}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          {children}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
