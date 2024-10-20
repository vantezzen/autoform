import React from "react";
import { Box, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { ArrayElementWrapperProps } from "@autoform/react";

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <Box
      mt="md"
      p="md"
      style={{
        border: "1px solid #eee",
        borderRadius: 4,
        position: "relative",
      }}
    >
      <ActionIcon
        onClick={onRemove}
        color="red"
        variant="subtle"
        data-testid="remove-item-button"
      >
        <IconTrash size={16} />
      </ActionIcon>
      {children}
    </Box>
  );
};
