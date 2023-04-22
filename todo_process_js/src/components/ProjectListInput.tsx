import React, { useState, useEffect } from "react";
import BoxContainer from "./shared/BoxContainer";

import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import useImageSrc from "../hook/useImageSrc";

interface ProjectListInputProps {
  onCreateProject(
    title: string,
    description: string,
    file: Blob | undefined
  ): void;
}

const ProjectListInput: React.FC<ProjectListInputProps> = ({
  onCreateProject,
}) => {
  const [inputForm, setInputForm] = useState<{
    title: string;
    description: string;
    file: Blob | undefined;
  }>({
    title: "",
    description: "",
    file: undefined,
  });
  const { imageSrc } = useImageSrc(inputForm.file);

  // Function to handle thumbnail upload
  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setInputForm((prevInputForm) => ({
        ...prevInputForm,
        file: file,
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
    onCreateProject(inputForm.title, inputForm.description, inputForm.file);
    setInputForm({
      title: "",
      description: "",
      file: undefined,
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
        {imageSrc && (
          <img
            src={imageSrc}
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
