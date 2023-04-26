import React from "react";
import { Typography, Box } from "@mui/material";

const BoxContainer = ({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element;
}) => {
  return (
    <Box
      padding={"1.5rem 2rem"}
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Add box-shadow to separate from background
        // minHeight: "80vh", // Set height to more than 70vh
        boxSizing: "border-box",
        borderRadius: "10px",
      }}
    >
      {title && (
        <Typography
          variant="h5"
          mb={3}
          mt={1}
          style={{ wordBreak: "keep-all" }}
        >
          {title}
        </Typography>
      )}

      {children}
    </Box>
  );
};

export default BoxContainer;
