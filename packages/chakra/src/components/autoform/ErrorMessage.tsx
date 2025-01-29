import React from "react";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
  if (!error) return null;
  return (
    <div style={{ color: "red", height: "20px" }}>
      <p style={{ marginTop: "10px" }}>{error}</p>
    </div>
  );
};
