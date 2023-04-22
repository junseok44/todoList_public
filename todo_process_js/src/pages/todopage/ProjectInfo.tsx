import React, { useState } from "react";
import BoxContainer from "../../components/shared/BoxContainer";
import { CardMedia, Grid, Stack, Typography } from "@mui/material";
import Progress from "../../components/shared/Progress";
import { observer } from "mobx-react";

const ProjectInfo = ({
  title,
  allCount,
  completedCount,
  thumbNailSrc,
  progress,
  changeProjectThumbnail,
}: {
  title: string;
  allCount: number;
  completedCount: number;
  thumbNailSrc: string | null;
  progress: number;
  changeProjectThumbnail: (src: string) => void;
}) => {
  // const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // setImageFile(event.target.files[0]);
      if (thumbNailSrc) URL.revokeObjectURL(thumbNailSrc);
      changeProjectThumbnail(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <BoxContainer>
      <Stack rowGap={"1rem"}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={thumbNailSrc as string | undefined}
          style={{ cursor: "pointer" }}
          // Add onClick event to trigger file input click
          onClick={() => document.getElementById("imageInput")?.click()}
        />
        {/* Render hidden file input */}
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
