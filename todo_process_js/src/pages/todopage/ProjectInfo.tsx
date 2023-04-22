import React, { useState } from "react";
import BoxContainer from "../../components/shared/BoxContainer";
import { CardMedia, Grid, Stack, Typography } from "@mui/material";
import Progress from "../../components/shared/Progress";
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
          image={imageSrc}
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

        {/* {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="uploaded"
          height="140"
        />
      )} */}

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

export default observer(ProjectInfo);
