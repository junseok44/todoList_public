import React from "react";
import { IconButton, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Checkbox } from "@mui/material";
import { observer } from "mobx-react";
import { Typography } from "@mui/joy";
import { Delete } from "@mui/icons-material";
import { Step } from "../../state/Step";

const priorityColor = ["#fd79a8", "#81ecec", "#a29bfe"];

const StepItem = ({
  step,
  isEdit,
  onDelete,
}: {
  step: Step;
  isEdit: boolean;
  onDelete: (id: string) => void;
}) => {
  return (
    <ListItem>
      <ListItemIcon
        sx={{
          background: priorityColor[step.priority - 1],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <Typography variant="plain">{step.priority}순위</Typography>
      </ListItemIcon>
      <ListItemText primary={step.title} secondary={step.desc} />
      {isEdit && (
        <IconButton onClick={() => onDelete(step.id)}>
          <Delete></Delete>
        </IconButton>
      )}
    </ListItem>
  );
};

export default observer(StepItem);
