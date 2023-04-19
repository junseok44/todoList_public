import React, { useState } from "react";
import { Checkbox } from "@mui/material";
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

const TodoListItem = ({
  todo,
  onClick,
  onCheckboxClick,
}: {
  todo: Todo;
  onClick: (id: string) => void;
  onCheckboxClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const haveNested = todo.list.length > 0;

  const handleClick = action((e: React.MouseEvent) => {
    e.stopPropagation();
    todo.done = !todo.done;
    // onCheckboxClick();
  });
  return (
    <div>
      <ListItemButton onClick={() => onClick(todo.id)}>
        <ListItemIcon>
          {haveNested ? (
            <div>
              {todo.completedItemCount} / {todo.allItemCount}
            </div>
          ) : (
            <Checkbox checked={todo.done} onClick={handleClick}></Checkbox>
          )}
        </ListItemIcon>
        <ListItemText primary={todo.title} onClick={() => setIsOpen(!isOpen)} />
        {haveNested && isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {haveNested && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {todo.list.map((step) => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Checkbox edge={"start"}></Checkbox>
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
