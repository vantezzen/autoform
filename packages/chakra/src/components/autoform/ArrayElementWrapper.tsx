import React from "react";
import { ArrayElementWrapperProps } from "@autoform/react";
import { Card, Stack, Button } from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <Button onClick={onRemove} variant="solid" rounded="md" type="button">
            <FaRegTrashCan />
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          {children}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
