import React from "react";
import { Stack, Container, Grid, Box, Typography } from "@mui/material"; // Importing Container and Grid components from @mui/material package
import BoxContainer from "./shared/BoxContainer";
import CardComponent from "./shared/CardComponent";
import { Project } from "../state/Todo";
import { observer } from "mobx-react";
const items = [
  {
    title: "일본여행",
    description:
      "도쿄로 갈 예정인데, 미리미리 준비해서 좋은 여행이 되도록 노력하자!",
    imageSrc: process.env.PUBLIC_URL + "/japan.jpg",
  },
  {
    title: "런던 여행",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  },
  {
    title: "Project C",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageSrc: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    title: "Project D",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageSrc: "https://images.unsplash.com/photo-1519898748533-f384c3214b4f",
  },
  {
    title: "Project E",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageSrc: "https://images.unsplash.com/photo-1535105690413-7f6a5b5d7a5c",
  },
  {
    title: "Project F",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: "https://images.unsplash.com/photo-1520975954088-bb6a29c3ee98",
  },
];

const ProjectList = ({ list }: { list: Project[] }) => {
  return (
    <BoxContainer>
      <>
        <Stack
          direction="row"
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          mb={3}
        >
          <Typography variant="h5"> project list</Typography>
          <div>리스트 편집하기</div>
        </Stack>
        <Grid container spacing={2}>
          {list.map((item) => (
            <Grid
              item
              container
              md={4}
              sm={6}
              xs={12}
              justifyContent={"center"}
            >
              <CardComponent
                title={item.title}
                desc={item.description}
                src={item.thumbNailSrc}
              ></CardComponent>
            </Grid>
          ))}
        </Grid>
      </>
    </BoxContainer>
  );
};

export default observer(ProjectList);
