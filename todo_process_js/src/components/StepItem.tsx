import React from "react";
import { IconButton } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Checkbox } from "@mui/material";
import { Step } from "../state/Todo";
import { observer } from "mobx-react";
import { Typography } from "@mui/joy";
import { Delete } from "@mui/icons-material";

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
    <div>
      <ListItemButton>
        {/* <ListItemIcon>
          <Checkbox checked={step.done} onClick={step.toggleStep}></Checkbox>
        </ListItemIcon> */}
        <ListItemIcon>
          <Typography variant="plain">{step.priority}순위</Typography>
        </ListItemIcon>
        <ListItemText primary={step.title} secondary={step.desc} />
        {isEdit && (
          <IconButton onClick={() => onDelete(step.id)}>
            <Delete></Delete>
          </IconButton>
        )}
      </ListItemButton>
    </div>
  );
};

export default observer(StepItem);
