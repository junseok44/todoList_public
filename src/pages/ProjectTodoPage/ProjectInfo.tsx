import React, { useState } from "react";
import BoxContainer from "../../components/BoxContainer";
import { CardMedia, Grid, Stack, Typography } from "@mui/material";
import Progress from "../../components/Progress";
import { observer } from "mobx-react";
import useImageSrc from "../../hook/useImageSrc";

const ProjectInfo = ({
  title,
  allCount,
  completedCount,
  file,
  changeProjectThumbnail,
  progress,
}: {
  title: string;
  allCount: number;
  completedCount: number;
  file: Blob | undefined;
  progress: number;
  changeProjectThumbnail: (file: Blob) => void;
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      changeProjectThumbnail(event.target.files[0]);
    }
  };

  const { imageSrc } = useImageSrc(file);

  return (
    <BoxContainer>
      <Stack rowGap={"1rem"}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={imageSrc || ""}
          style={{ cursor: "pointer" }}
          onClick={() => document.getElementById("imageInput")?.click()}
        />
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        <Grid container justifyContent={"space-between"}>
          <Grid item xs={8}>
            <Typography
              variant="h5"
              style={{
                wordBreak: "keep-all",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack alignItems={"flex-end"} rowGap={0.5}>
              <div>{progress}%</div>
              <div>
                {completedCount}/{allCount}개 완료
              </div>
            </Stack>
          </Grid>
        </Grid>
        <Progress progress={progress}></Progress>
      </Stack>
    </BoxContainer>
  );
};

export default observer(ProjectInfo);
