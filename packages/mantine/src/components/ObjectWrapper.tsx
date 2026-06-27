import React from "react";
import { Box, Title, Text } from "@mantine/core";
import { ObjectWrapperProps } from "@dual-autoform/react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
  parsedField,
}) => {
  return (
    <Box mt="md">
      <Title order={5} style={{ marginTop: "25px" }}>
        {label}
      </Title>
      {parsedField.fieldConfig?.description && (
        <Text size="xs" c="dimmed" mb={3}>
          {parsedField.fieldConfig?.description}
        </Text>
      )}
      {children}
    </Box>
  );
};
