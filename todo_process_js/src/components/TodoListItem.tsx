import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoListItem = ({
  first = "hello",
  second = "second",
  isEdit = true,
}: {
  first?: string;
  second?: string;
  isEdit?: boolean;
}) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <Checkbox></Checkbox>
      </ListItemIcon>
      <ListItemText primary={first} secondary={second} />
      {isEdit && (
        <IconButton>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      )}
    </ListItemButton>
  );
};

export default TodoListItem;
