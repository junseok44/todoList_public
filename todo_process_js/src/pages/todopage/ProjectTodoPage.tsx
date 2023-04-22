import React, { useRef } from "react";
import { Stack } from "@mui/material"; // Importing necessary components from MUI
import { Grid, Container } from "@mui/material";
import ProjectTodoList from "../../components/ProjectTodoList";
import RightPane from "./RightPane";
import LeftPane from "./LeftPane";
import ProjectInfo from "./ProjectInfo";
import { useCurrentProject } from "../../state/Todo";
import { observer } from "mobx-react";
import ProjectlistPage from "../ProjectlistPage";

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
                  allCount={Project.allItemCount}
                  completedCount={Project.completedItemCount}
                  thumbNailSrc={Project.thumbNailSrc}
                  progress={Project.Progress}
                  changeProjectThumbnail={Project.changeThumbnailSrc}
                ></ProjectInfo>
                <ProjectTodoList
                  list={Project.list}
                  addTodo={Project.createItem}
                  setCurrentTodo={Project.setCurrentItemId}
                  deleteItem={Project.deleteItem}
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
