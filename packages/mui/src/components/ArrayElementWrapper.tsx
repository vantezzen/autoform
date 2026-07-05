import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import type { ArrayElementWrapperProps } from "@autoform/react";

function DeleteIcon() {
  return (
    <SvgIcon data-testid="DeleteIcon">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
    </SvgIcon>
  );
}

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 1,
        position: "relative",
      }}
    >
      <IconButton
        onClick={onRemove}
        sx={{ position: "absolute", top: 8, right: 8 }}
        size="small"
        type="button"
        aria-label="remove item"
      >
        <DeleteIcon />
      </IconButton>
      {children}
    </Box>
  );
};
