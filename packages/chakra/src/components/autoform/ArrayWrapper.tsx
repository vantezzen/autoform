import React from "react";
import { ArrayWrapperProps } from "@autoform/react";
import { Button, Stack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  children,
  onAddItem,
}) => {
  return (
    <Stack>
      {children}
      <Button onClick={onAddItem} variant="solid" rounded="md" type="button" marginLeft="4">
        <FaPlus />
      </Button>
    </Stack>
  );
};
