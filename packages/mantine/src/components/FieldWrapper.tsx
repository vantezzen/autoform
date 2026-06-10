import React from "react";
import { FieldWrapperProps } from "@acp-autoform/react";

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ children, error }) => {
  return <div style={{ display: "contents" }}>{children}</div>;
};
