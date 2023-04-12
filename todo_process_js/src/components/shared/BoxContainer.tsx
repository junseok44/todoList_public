import React from "react";
import { Box } from "@mui/material";

const BoxContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <Box
      padding={"1rem"}
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Add box-shadow to separate from background
        // minHeight: "80vh", // Set height to more than 70vh
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default BoxContainer;
