import React from "react";
import { FieldWrapperProps } from "@acp-autoform/react";

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ children }) => {
  return <div style={{ display: "contents" }}>{children}</div>;
};
