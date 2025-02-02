import React from "react";
import { ArrayElementWrapperProps } from "@autoform/react";
import { Card, Button } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <Button
            onClick={onRemove}
            variant="surface"
            rounded="md"
            type="button"
          >
            <FiTrash2 style={{ height: 19, width: 19 }} />
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card.Root>
  );
};
