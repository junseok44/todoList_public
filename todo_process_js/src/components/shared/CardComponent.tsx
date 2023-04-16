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
  src,
}: {
  title: string;
  desc: string;
  src: string;
}) => {
  return (
    <StyledCard>
      <StyledLink to="/project/123">
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`${src}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
          <Progress></Progress>
        </CardContent>
      </StyledLink>
    </StyledCard>
  );
};

export default CardComponent;
