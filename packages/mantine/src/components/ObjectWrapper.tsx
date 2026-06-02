import React from "react";
import { Box, Title, Text } from "@mantine/core";
import { ObjectWrapperProps } from "@acp-autoform/react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  field,
  children,
}) => {
  return (
    <Box mt="md">
      <Title order={5} style={{ marginTop: "25px" }}>
        {label}
      </Title>
      {field.fieldConfig?.description && (
        <Text size="xs" c="dimmed" mb={3}>
          {field.fieldConfig?.description}
        </Text>
      )}
      {children}
    </Box>
  );
};
