import React from "react";
import { FiPlus } from "react-icons/fi";
import { ArrayWrapperProps } from "@acp-autoform/react";
import { Button, Heading, Stack, FieldHelperText } from "@chakra-ui/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  error,
  children,
  onAddItem,
  inputProps,
  parsedField,
}) => {
  const { key, ref, "aria-invalid": ariaInvalid, ...props } = inputProps;

  return (
    <Stack w={"full"} marginBottom={1} gapY={1}>
      <Heading
        size={"md"}
        fontWeight={"medium"}
        ref={ref}
        tabIndex={-1}
        aria-invalid={ariaInvalid}
        aria-describedby={`${key}-error ${key}-description `}
        _focusVisible={{
          outline: "2px solid color-mix(in srgb, Highlight 50%, transparent)",
          outlineOffset: "5px",
          borderRadius: "5px",
        }}
      >
        {label}
        {parsedField.required && (
          <span style={{ color: "#ef4444", opacity: 0.8 }}> * </span>
        )}
      </Heading>
      {parsedField.fieldConfig?.description && (
        <FieldHelperText id={key + "-description"}>
          {parsedField.fieldConfig.description}
        </FieldHelperText>
      )}
      {error && (
        <span
          id={key + "-error"}
          style={{ color: "#ef4444", fontSize: "12px" }}
        >
          {error}
        </span>
      )}
      <div>
        {children}
        <Button
          px={10}
          rounded="md"
          mt="1"
          variant={"surface"}
          {...props}
          type="button"
          onClick={onAddItem}
          aria-label={`add ${label}`}
        >
          <FiPlus />
        </Button>
      </div>
    </Stack>
  );
};
