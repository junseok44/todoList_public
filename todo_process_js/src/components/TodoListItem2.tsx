import React, { useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

import { Todo } from "../state/Todo";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Delete } from "@mui/icons-material";

const TodoListItem = ({
  todo,
  isEdit,
  onClick,
  onDelete,
}: {
  todo: Todo;
  isEdit: boolean;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const haveNested = todo.list.length > 0;

  const handleClick = action((e: React.MouseEvent) => {
    e.stopPropagation();
    todo.done = !todo.done;
  });

  return (
    <div>
      <ListItemButton
        onClick={() => {
          onClick(todo.id);
        }}
      >
        <ListItemIcon>
          {haveNested ? (
            <div>
              {todo.completedItemCount} / {todo.allItemCount}
            </div>
          ) : (
            <Checkbox checked={todo.done} onClick={handleClick}></Checkbox>
          )}
        </ListItemIcon>
        <ListItemText
          primary={todo.title}
          onClick={() => setIsOpen(!isOpen)}
          style={{ wordBreak: "keep-all" }}
        />
        {isEdit ? (
          <IconButton onClick={() => onDelete(todo.id)}>
            <Delete></Delete>
          </IconButton>
        ) : (
          haveNested && (isOpen ? <ExpandLess /> : <ExpandMore />)
        )}
      </ListItemButton>
      {haveNested && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {todo.list.map((step) => (
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  step.done = !step.done;
                }}
              >
                <ListItemIcon>
                  <Checkbox checked={step.done} edge={"start"}></Checkbox>
                </ListItemIcon>
                <ListItemText primary={step.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export default observer(TodoListItem);
