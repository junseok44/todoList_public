import React, { useState } from "react";
import {
  Grid,
  Typography,
  Checkbox,
  CardMedia,
  Stack,
  Button,
} from "@mui/material";
import Input from "../components/shared/input";
import Progress from "../components/shared/Progress";
import List from "@mui/material/List";

import BoxContainer from "./shared/BoxContainer";
import TodoListItem from "./TodoListItem";
import TodoListItem_Nested from "./TodoListItem_Nested";

const ProjectTodoList = () => {
  return (
    <BoxContainer>
      <>
        <Input placeholder="할일을 추가하세요.."></Input>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <TodoListItem_Nested></TodoListItem_Nested>
          <TodoListItem></TodoListItem>
        </List>
        <Stack direction="row" justifyContent={"flex-end"}>
          <Button color="error" variant="outlined">
            edit
          </Button>
        </Stack>
      </>
    </BoxContainer>
  );
};

export default ProjectTodoList;
