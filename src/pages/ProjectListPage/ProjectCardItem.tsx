import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import Progress from "../../components/Progress";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import useImageSrc from "../../hook/useImageSrc";
import { Check } from "@mui/icons-material";

const StyledCard = styled(Card)({
  maxWidth: 345,
  flex: 1,
  transition: "transform 0.2s", // add transition for smooth animation
  "&:hover": {
    transform: "scale(1.05)", // scale the card on hover
  },
  cursor: "pointer",
});

const StyledCheckIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledLink = styled(Link)`
  all: unset;
`;

interface CardComponentProps {
  title: string;
  id: string;
  desc: string | undefined;
  file: Blob | undefined;
  progress: number;
  isSelected: boolean;
  isSelectMode: boolean;
  onClick: (id: string) => void;
  onSubmit: (title?: string, desc?: string) => void;
  onSelected: (id: string) => void;
}

const ProjectCardItem = ({
  title,
  id,
  desc,
  file,
  progress,
  isSelected,
  isSelectMode,
  onSelected,
  onClick,
  onSubmit,
}: CardComponentProps) => {
  const { imageSrc } = useImageSrc(file);
  const [isEditing, setIsEditing] = useState(false); // state to toggle edit mode
  const [editedTitle, setEditedTitle] = useState(title); // state to store edited title
  const [editedDesc, setEditedDesc] = useState(desc); // state to store edited description

  const handleEditClick = () => {
    setIsEditing(!isEditing); // set edit mode to true when edit button is clicked
  };

  const handleCancelClick = () => {
    setIsEditing(false); // set edit mode to false when cancel button is clicked
    setEditedTitle(title); // reset edited title to original title
    setEditedDesc(desc); // reset edited description to original description
  };

  const handleSubmitClick = () => {
    onSubmit(editedTitle, editedDesc); // call onSubmit function with edited title and description
    setIsEditing(false); // set edit mode to false after submitting
  };

  return (
    <StyledCard onClick={() => onClick(id)} style={{ position: "relative" }}>
      {isSelectMode && (
        <StyledCheckIcon
          onClick={(e) => {
            e.stopPropagation();
            onSelected(id);
          }}
        >
          {isSelected && (
            <Check style={{ color: "white", fontSize: "2rem" }}></Check>
          )}
        </StyledCheckIcon>
      )}
      <Stack style={{ height: "100%" }}>
        <StyledLink to={`/project/${id}`}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={imageSrc || ""}
          />
        </StyledLink>
        <CardContent style={{ flex: 1 }}>
          {isEditing ? (
            <>
              <TextField
                label="Title"
                variant="standard"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                fullWidth
                // margin="normal"
              />
              <TextField
                label="Description"
                variant="standard"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
                fullWidth
                margin="normal"
              />
            </>
          ) : (
            <>
              <StyledLink
                to={`/project/${id}`}
                style={{ height: "100%", display: "block" }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{
                    wordBreak: "keep-all",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ wordBreak: "keep-all" }}
                >
                  {desc}
                </Typography>
              </StyledLink>
            </>
          )}
        </CardContent>
        <CardActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            {!isEditing && (
              <Typography variant="button">진척도 {progress}%</Typography>
            )}
            {isEditing ? (
              <div>
                <Button onClick={handleSubmitClick}>완료</Button>
                <Button onClick={handleCancelClick}>취소하기</Button>
              </div>
            ) : (
              <Button onClick={handleEditClick}>편집하기</Button>
            )}
          </Stack>
        </CardActions>
        <Progress progress={progress}></Progress>
      </Stack>
    </StyledCard>
  );
};

export default observer(ProjectCardItem);
