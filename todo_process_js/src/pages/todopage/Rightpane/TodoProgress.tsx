import React from "react";
import BoxContainer from "../../../components/shared/BoxContainer";
import { Button, Grid, Stack } from "@mui/material";
import { CircularProgress } from "@mui/joy";

const TodoProgress = () => {
  return (
    <BoxContainer title="환전하기">
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item>
          <CircularProgress
            determinate
            value={40}
            sx={{
              "--CircularProgress-size": "90px",
              "--CircularProgress-trackThickness": "5px",
              "--CircularProgress-progressThickness": "5px",
            }}
          >
            <div>1/3</div>
          </CircularProgress>
        </Grid>
        <Grid item>
          <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
            <div>전체 3개 중 1개 완료</div>
            <div>40%정도가 완료되었어요!!</div>
            <Button variant="contained" size="small">
              전부 완료하기
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </BoxContainer>
  );
};

export default TodoProgress;
