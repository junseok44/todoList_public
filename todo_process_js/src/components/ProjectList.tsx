import React from "react";
import { Stack, Container, Grid, Box, Typography } from "@mui/material"; // Importing Container and Grid components from @mui/material package
import BoxContainer from "./shared/BoxContainer";
import CardComponent from "./shared/CardComponent";
import { Project } from "../state/Todo";
import { observer } from "mobx-react";


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
              key={item.id}
              item
              container
              md={4}
              sm={6}
              xs={12}
              justifyContent={"center"}
            >
              <CardComponent
                title={item.title}
                desc={item.desc}
                src={item.thumbNailSrc}
                progress={item.Progress}
              ></CardComponent>
            </Grid>
          ))}
        </Grid>
      </>
    </BoxContainer>
  );
};

export default observer(ProjectList);
