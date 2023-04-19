import React from "react";
import BoxContainer from "../../components/shared/BoxContainer";
import { CardMedia, Grid, Stack, Typography } from "@mui/material";
import Progress from "../../components/shared/Progress";

const ProjectInfo = ({
  title,
  allCount,
  completedCount,
  thumbNailSrc,
  progress,
}: {
  title: string;
  allCount: number;
  completedCount: number;
  thumbNailSrc: string | null;
  progress: number;
}) => {
  return (
    <BoxContainer>
      <Stack rowGap={"1rem"}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          // image={`${process.env.PUBLIC_URL}/japan.jpg`}
          image={thumbNailSrc as string | undefined}
        />
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">{title}</Typography>
          <Stack alignItems={"flex-end"} rowGap={0.5}>
            <div>{progress}%</div>
            <div>
              {completedCount}/{allCount}개 완료
            </div>
          </Stack>
        </Grid>
        <Progress progress={progress}></Progress>
      </Stack>
    </BoxContainer>
  );
};

export default ProjectInfo;
