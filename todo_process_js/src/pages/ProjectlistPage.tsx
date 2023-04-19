import React from "react";
import { Stack, Container, Grid, Box, Typography } from "@mui/material"; // Importing Container and Grid components from @mui/material package
import ProjectList from "../components/ProjectList";
import ProjectListInput from "../components/ProjectListInput";
import { ProjectStoreProvider, useTodoStore } from "../state/Todo";
import { observer } from "mobx-react";

const ProjectlistPage = () => {
  const projectStore = useTodoStore();

  if (!projectStore) return <div>loading...</div>;
  return (
    <Container maxWidth="lg" sx={{ mb: 4, margin: "4rem auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProjectList list={projectStore.ProjectList}></ProjectList>
        </Grid>
        <Grid item xs={6} md={4}>
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
