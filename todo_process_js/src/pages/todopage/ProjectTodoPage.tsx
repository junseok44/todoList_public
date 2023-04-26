import React, { useRef } from "react";
import { Stack } from "@mui/material"; // Importing necessary components from MUI
import { Grid, Container } from "@mui/material";
import ProjectTodoList from "../../components/ProjectTodoList";
import RightPane from "./RightPane";
import LeftPane from "./LeftPane";
import ProjectInfo from "./ProjectInfo";
import { observer } from "mobx-react";
import { useCurrentProject } from "../../state/ProjectStore";

const TodolistPage = () => {
  const Project = useCurrentProject();

  return (
    <Container sx={{ margin: "4rem auto" }}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <LeftPane></LeftPane>
        </Grid>

        {Project ? (
          <>
            <Grid item md={4} sm={6} xs={12}>
              <Stack spacing={2}>
                <ProjectInfo
                  key={Project.id}
                  // id가 없었기 때문에. 안에서 관리되는 state가 유지되고 있었던 것이다.
                  title={Project.title}
                  allCount={Project.allItemCount}
                  completedCount={Project.completedItemCount}
                  file={Project.thumbNailFile}
                  progress={Project.Progress}
                  changeProjectThumbnail={Project.changeThumbnail}
                ></ProjectInfo>
                <ProjectTodoList
                  list={Project.list}
                  addTodo={Project.createItem}
                  setCurrentTodo={(id) => {
                    Project.setCurrentItemId(id);
                  }}
                  deleteItem={Project.deleteItem}
                ></ProjectTodoList>
              </Stack>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <RightPane></RightPane>
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
