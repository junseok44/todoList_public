import React, { useState } from "react";
import BoxContainer from "./shared/BoxContainer";

import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";

// Define the component
const ProjectListInput = () => {
  const [thumbnail, setThumbnail] = useState("");

  // Function to handle thumbnail upload
  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Get the uploaded file
    const file = event.target.files?.[0];

    // Check if file is valid
    if (file && file.type.startsWith("image/")) {
      // Create a URL for the uploaded file
      const url = URL.createObjectURL(file);

      // Set the thumbnail state to the created URL
      setThumbnail(url);
    }
  };

  return (
    // Use Box component to create a container
    <Box
      padding={"1rem"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Add box-shadow to separate from background
        // flex: "1 1 auto",
      }}
    >
      {/* Use Typography component to display the heading */}
      <Typography variant="h5">Add Project</Typography>
      {/* Use TextField component to create an input field for project name */}
      <TextField
        label="Project Name"
        variant="outlined"
        margin="normal"
        sx={{ width: "100%" }}
      />
      {/* Use TextareaAutosize component to create a textarea for project description */}
      <TextField
        multiline
        rows={3}
        maxRows={3}
        aria-label="Project Description"
        placeholder="Project Description"
        sx={{ width: "100%" }}
      ></TextField>
      {/* Use Button component to create a file upload button */}
      <Button
        variant="contained"
        component="label"
        sx={{ marginTop: "0.5rem" }}
      >
        Upload Thumbnail
        <input type="file" hidden onChange={handleThumbnailUpload} />
      </Button>
      {/* Preview of the uploaded thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="Thumbnail Preview"
          style={{ width: "100%" }}
        />
      )}
    </Box>
  );
};

export default ProjectListInput;
