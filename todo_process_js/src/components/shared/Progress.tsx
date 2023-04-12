import React from "react";
import { Typography, Stack, LinearProgress } from "@mui/material";

const Progress = () => {
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"} mb={-1} mt={2}>
        {" "}
        {/* Use inline style to set display property to flex */}
        <Typography variant="caption">40%</Typography>{" "}
        {/* Display progress percentage */}
        <Typography variant="caption">1/4개 완료</Typography>{" "}
        {/* Display progress in fraction */}
      </Stack>
      <LinearProgress variant="determinate" value={30} sx={{ mt: 2 }} />{" "}
      {/* Use MUI LinearProgress component with variant and value props */}
    </>
  );
};

export default Progress;
