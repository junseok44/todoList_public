import React from "react";
import BoxContainer from "../../../components/shared/BoxContainer";
import { Button, Grid, Stack } from "@mui/material";
import { CircularProgress } from "@mui/joy";
import { observer } from "mobx-react";

const TodoProgress = ({
  name,
  completedCount,
  allStepsCount,
  progress,
  onClick,
}: {
  name: string;
  completedCount: number;
  allStepsCount: number;
  progress: number;
  onClick: () => void;
}) => {
  return (
    <BoxContainer title={name}>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item>
          <CircularProgress
            determinate
            value={progress}
            sx={{
              "--CircularProgress-size": "90px",
              "--CircularProgress-trackThickness": "5px",
              "--CircularProgress-progressThickness": "5px",
            }}
          >
            <div>
              {completedCount} / {allStepsCount}{" "}
            </div>
          </CircularProgress>
        </Grid>
        <Grid item>
          <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
            <div>
              전체 {allStepsCount}개 중 {completedCount}개 완료
            </div>
            <div>{progress}% 완료되었어요!!</div>
            <Button variant="contained" size="small" onClick={onClick}>
              전부 완료하기
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </BoxContainer>
  );
};

export default observer(TodoProgress);
