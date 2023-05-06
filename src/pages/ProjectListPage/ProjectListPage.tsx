import React from "react";
import { Stack, Container, Grid, Box, Typography } from "@mui/material"; // Importing Container and Grid components from @mui/material package
import ProjectView from "./ProjectView";
import ProjectListInput from "./CreateProject";
import { observer } from "mobx-react";
import { useTodoStore } from "../../state/ProjectStore";

const ProjectlistPage = () => {
  const projectStore = useTodoStore();

  if (!projectStore) return <div>loading...</div>;
  return (
    <Container maxWidth="xl" sx={{ mb: 4, margin: "4rem auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProjectView
            // list={projectStore.ProjectList}
            setCurrentProject={projectStore.setCurrentProject}
            deleteProject={projectStore.deleteProject}
          ></ProjectView>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack rowGap={2}>
            <ProjectListInput
              onCreateProject={projectStore.createProject}
            ></ProjectListInput>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default observer(ProjectlistPage);
