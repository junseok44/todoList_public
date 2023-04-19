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
const ProjectListInput = ({
  onCreateProject,
}: {
  onCreateProject(title: string, description: string, src: string | null): void;
}) => {
  const [inputForm, setInputForm] = useState<{
    title: string;
    description: string;
    fileUrl: string | null;
  }>({
    title: "",
    description: "",
    fileUrl: null,
  });

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

      // 문제는 inputForm이 null일수도 있으니까. 그 경우에는
      setInputForm((prevInputForm) => ({
        ...prevInputForm,
        fileUrl: url,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputForm.title || !inputForm.description) return;
    onCreateProject(inputForm.title, inputForm.description, inputForm.fileUrl);
    setInputForm({
      title: "",
      description: "",
      fileUrl: null,
    });
  };

  return (
    // Use Box component to create a container
    <form onSubmit={handleSubmit}>
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
        <Typography variant="h5">Add Project</Typography>
        <TextField
          label="Project Name"
          value={inputForm.title}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          name="title"
          sx={{ width: "100%" }}
        />
        <TextField
          multiline
          value={inputForm.description}
          onChange={handleChange}
          rows={3}
          name="description"
          aria-label="Project Description"
          placeholder="Project Description"
          sx={{ width: "100%" }}
        ></TextField>
        <Button
          variant="contained"
          component="label"
          sx={{ marginTop: "0.5rem" }}
        >
          Upload Thumbnail
          <input type="file" hidden onChange={handleThumbnailUpload} />
        </Button>
        {/* Preview of the uploaded thumbnail */}
        {inputForm?.fileUrl && (
          <img
            src={inputForm.fileUrl}
            alt="Thumbnail Preview"
            style={{ width: "100%" }}
          />
        )}
        <Button variant="outlined" type="submit" sx={{ marginTop: "0.5rem" }}>
          Create a project
        </Button>
      </Box>
    </form>
  );
};

export default ProjectListInput;
