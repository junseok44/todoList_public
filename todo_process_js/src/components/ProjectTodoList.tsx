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
import TodoListItem from "./TodoListItem2";
import { toUnicode } from "punycode";
import { Todo } from "../state/Todo";
import { observer } from "mobx-react";

const ProjectTodoList = ({
  list,
  addTodo,
  setCurrentTodo,
}: {
  list: Todo[];
  addTodo: (title: string) => void;
  setCurrentTodo: (id: string) => void;
}) => {
  return (
    <BoxContainer>
      <>
        <Input placeholder="할일을 추가하세요.." onSubmit={addTodo}></Input>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {list.map((todo) => (
            <TodoListItem todo={todo} onClick={setCurrentTodo}></TodoListItem>
          ))}
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

export default observer(ProjectTodoList);
