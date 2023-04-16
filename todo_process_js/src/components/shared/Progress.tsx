import React from "react";
import { Typography, Stack, LinearProgress } from "@mui/material";

const Progress = () => {
  return <LinearProgress variant="determinate" value={30} sx={{ mt: 2 }} />;
};

export default Progress;
