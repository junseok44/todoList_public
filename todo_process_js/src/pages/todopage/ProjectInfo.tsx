import React from "react";
import BoxContainer from "../../components/shared/BoxContainer";
import { CardMedia, Grid, Stack, Typography } from "@mui/material";
import Progress from "../../components/shared/Progress";

const ProjectInfo = () => {
  return (
    <BoxContainer>
      <Stack rowGap={"1rem"}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`${process.env.PUBLIC_URL}/japan.jpg`}
        />
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">일본여행</Typography>
          <Stack alignItems={"flex-end"} rowGap={0.5}>
            <div>40%</div>
            <div>1/4개 완료</div>
          </Stack>
        </Grid>
        <Progress></Progress>
      </Stack>
    </BoxContainer>
  );
};

export default ProjectInfo;
