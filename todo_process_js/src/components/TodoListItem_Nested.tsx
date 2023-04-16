import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import List from "@mui/material/List";

const TodoListItem_Nested = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ListItemButton>
        <ListItemIcon>
          <div>1/2</div>
          {/* <CircularProgress variant="soft" value={60} determinate>
                  <div>1/2</div>
                </CircularProgress> */}
        </ListItemIcon>
        <ListItemText primary="환전하기" onClick={() => setIsOpen(!isOpen)} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Checkbox edge={"start"}></Checkbox>
            </ListItemIcon>
            <ListItemText primary="은행앱으로 신청하기" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Checkbox edge={"start"}></Checkbox>
            </ListItemIcon>
            <ListItemText primary="공항에서 수령" />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
};

export default TodoListItem_Nested;
