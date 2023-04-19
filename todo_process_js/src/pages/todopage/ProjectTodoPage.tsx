import React, { useRef } from "react";
import { Stack } from "@mui/material"; // Importing necessary components from MUI
import { Grid, Container } from "@mui/material";
import ProjectTodoList from "../../components/ProjectTodoList";
import RightPane from "./RightPane";
import LeftPane from "./LeftPane";
import ProjectInfo from "./ProjectInfo";
import { useCurrentProject } from "../../state/Todo";
import { observer } from "mobx-react";

const TodolistPage = () => {
  const Project = useCurrentProject();
  // 여기서 projectStore을 불러와서
  // 그것의 currentProject를 불러오는 경우에는.

  return (
    <Container sx={{ margin: "4rem auto" }}>
      <Grid container spacing={2}>
        <LeftPane></LeftPane>
        {Project ? (
          <>
            <Grid item md={4} xs={12}>
              <Stack spacing={2}>
                <ProjectInfo
                  title={Project.title}
                  allCount={Project.allTodosCount}
                  completedCount={Project.completedTodos}
                  thumbNailSrc={Project.thumbNailSrc}
                  progress={Project.Progress}
                ></ProjectInfo>
                <ProjectTodoList
                  list={Project.Todos}
                  addTodo={Project.addTodo}
                  setCurrentTodo={Project.setCurrentTodoId}
                ></ProjectTodoList>
              </Stack>
            </Grid>
            <Grid item md={4} xs={12}>
              <Stack spacing={2}>
                <RightPane></RightPane>
              </Stack>
            </Grid>
          </>
        ) : (
          <div>loading..</div>
        )}

        {/* <Xarrow start={start} end={end}></Xarrow> */}
      </Grid>
    </Container>
  );
};

export default observer(TodolistPage);
