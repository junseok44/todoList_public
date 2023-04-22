import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import Progress from "./Progress";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import useImageSrc from "../../hook/useImageSrc";
const StyledCard = styled(Card)({
  maxWidth: 345,
  flex: 1,
  transition: "transform 0.2s", // add transition for smooth animation
  "&:hover": {
    transform: "scale(1.05)", // scale the card on hover
  },
  cursor: "pointer",
});

const StyledLink = styled(Link)`
  all: unset;
`;

const CardComponent = ({
  title,
  desc,
  file,
  progress,
  id,
  onClick,
}: {
  title: string;
  id: string;
  desc: string | null;
  file: Blob | undefined;
  progress: number;
  onClick: (id: string) => void;
}) => {
  const { imageSrc } = useImageSrc(file);
  return (
    <StyledCard onClick={() => onClick(id)}>
      <StyledLink to="/project/123">
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={imageSrc}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
          <Progress progress={progress}></Progress>
        </CardContent>
      </StyledLink>
    </StyledCard>
  );
};

export default observer(CardComponent);
