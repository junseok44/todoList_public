import React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Checkbox } from "@mui/material";
import { Step } from "../state/Todo";

const StepItem = ({ step }: { step: Step }) => {
  return (
    <div>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox></Checkbox>
        </ListItemIcon>
        <ListItemText primary={step.title} />
      </ListItemButton>
    </div>
  );
};

export default StepItem;
