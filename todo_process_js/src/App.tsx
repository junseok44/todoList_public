import React from "react";
import { Stack, Container, Grid, Box, Typography } from "@mui/material"; // Importing Container and Grid components from @mui/material package
import ProjectList from "./components/ProjectList";
import ProjectListInput from "./components/ProjectListInput";

const App = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: 4, ml: 8, mr: 8, margin: "5rem auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProjectList></ProjectList>
        </Grid>
        <Grid item xs={6} md={4}>
          <Stack rowGap={2}>
            <ProjectListInput></ProjectListInput>
            <ProjectListInput></ProjectListInput>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
export default App;
