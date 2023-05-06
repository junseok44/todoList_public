import React, { useState, useEffect } from "react";
import BoxContainer from "../../components/BoxContainer";

import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Stack,
} from "@mui/material";
import useImageSrc from "../../hook/useImageSrc";

interface CreateProjectProps {
  onCreateProject(
    title: string,
    description: string,
    file: Blob | undefined
  ): void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onCreateProject }) => {
  const [inputForm, setInputForm] = useState<{
    title: string;
    description: string;
    file: Blob | undefined;
  }>({
    title: "",
    description: "",
    file: undefined,
  });

  const [errMsg, setErrMsg] = useState<string>("");

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
    if (errMsg) setErrMsg("");
    if (!inputForm.title) {
      setErrMsg("프로젝트 이름을 입력해주세요");
      return;
    }
    if (!inputForm.description) {
      setErrMsg("프로젝트 설명을 입력해주세요");
      return;
    }
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
        {errMsg && (
          <Typography color="red" data-testid="err-msg">
            {errMsg}
          </Typography>
        )}
        <TextField
          label="Project Name"
          value={inputForm.title}
          onChange={handleChange}
          variant="outlined"
          placeholder="프로젝트 제목을 입력"
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
          placeholder="프로젝트 설명을 입력"
          sx={{ width: "100%" }}
        ></TextField>

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Thumbnail Preview"
            style={{ width: "100%", marginTop: "0.5rem" }}
          />
        )}
        <Stack direction="row" columnGap={1}>
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: "0.5rem" }}
          >
            Upload Thumbnail
            <label htmlFor="thumbnail-upload" hidden>
              thumbnail-upload
            </label>
            <input
              id="thumbnail-upload"
              type="file"
              hidden
              onChange={handleThumbnailUpload}
            />
          </Button>
          <Button
            data-testid="create-project-button"
            variant="outlined"
            type="submit"
            sx={{ marginTop: "0.5rem" }}
          >
            Create a project
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default CreateProject;
