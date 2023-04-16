import React, { useRef } from "react";
import { Stack } from "@mui/material"; // Importing necessary components from MUI
import { Grid, Container } from "@mui/material";
import ProjectTodoList from "../../components/ProjectTodoList";
import RightPane from "./RightPane";
import LeftPane from "./LeftPane";
import ProjectInfo from "./ProjectInfo";

const TodolistPage = () => {
  return (
    <Container sx={{ margin: "4rem auto" }}>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <LeftPane></LeftPane>
        </Grid>
        <Grid item md={4} xs={12}>
          <Stack spacing={2}>
            <ProjectInfo></ProjectInfo>
            <ProjectTodoList></ProjectTodoList>
          </Stack>
        </Grid>
        <Grid item md={4} xs={12}>
          <Stack spacing={2}>
            <RightPane></RightPane>
          </Stack>
        </Grid>
        {/* <Xarrow start={start} end={end}></Xarrow> */}
      </Grid>
    </Container>
  );
};

export default TodolistPage;
