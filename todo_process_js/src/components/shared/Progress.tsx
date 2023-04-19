import React from "react";
import { Typography, Stack, LinearProgress } from "@mui/material";

const Progress = ({ progress }: { progress: number }) => {
  return (
    <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />
  );
};

export default Progress;
