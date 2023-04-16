import React from "react";
import { Stack, Container, Grid, Box, Typography } from "@mui/material"; // Importing Container and Grid components from @mui/material package
import ProjectList from "../components/ProjectList";
import ProjectListInput from "../components/ProjectListInput";

const ProjectlistPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: 4, margin: "4rem auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProjectList></ProjectList>
        </Grid>
        <Grid item xs={6} md={4}>
          <Stack rowGap={2}>
            <ProjectListInput></ProjectListInput>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectlistPage;
