import React from "react";
import { ArrayWrapperProps } from "@autoform/react";
import { Button, Card, Heading, Stack } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  children,
  onAddItem,
}) => {
  return (
    <Stack w={"full"} marginBottom={6}>
      <Heading size={"md"} fontWeight={"medium"}>
        {label}
      </Heading>
      {children}
      <Button onClick={onAddItem} variant="surface" rounded="md" type="button" >
        <FiPlus style={{ height: 22, width: 22 }} />
      </Button>
    </Stack>
  );
};
