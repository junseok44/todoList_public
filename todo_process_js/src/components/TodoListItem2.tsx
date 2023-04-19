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

const TodoListItem = ({
  todo,
  onClick,
}: {
  todo: Todo;
  onClick: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const haveNested = todo.steps.length > 0;
  return (
    <div>
      <ListItemButton onClick={() => onClick(todo.id)}>
        <ListItemIcon>
          {haveNested ? (
            <div>
              {todo.completedSteps} / {todo.allStepsCount}
            </div>
          ) : (
            <Checkbox></Checkbox>
          )}
        </ListItemIcon>
        <ListItemText primary={todo.name} onClick={() => setIsOpen(!isOpen)} />
        {haveNested && isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {haveNested && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {todo.steps.map((step) => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Checkbox edge={"start"}></Checkbox>
                </ListItemIcon>
                <ListItemText primary={step.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export default observer(TodoListItem);
