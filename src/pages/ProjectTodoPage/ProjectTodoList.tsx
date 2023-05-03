import React, { useEffect, useState } from "react";

import Input from "../../components/input";
import List from "@mui/material/List";

import BoxContainer from "../../components/BoxContainer";
import TodoListItem from "./TodoListItem";
import { Todo } from "../../state/Todo";
import { observer } from "mobx-react";
import EditButton from "../../components/EditButton";

const ProjectTodoList = ({
  list,
  addTodo,
  setCurrentTodo,
  deleteItem,
}: {
  list: Todo[];
  addTodo: (title: string, desc: string) => void;
  setCurrentTodo: (id: string) => void;
  deleteItem: (id: string) => void;
}) => {
  const [isEdit, setisEdit] = useState(false);

  return (
    <BoxContainer>
      <>
        <Input placeholder="할일을 추가하세요.." onSubmit={addTodo}></Input>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "40vh",
            overflow: "auto",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {list.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onClick={setCurrentTodo}
              onDelete={deleteItem}
              isEdit={isEdit}
            ></TodoListItem>
          ))}
        </List>

        <EditButton isEdit={isEdit} setisEdit={setisEdit}></EditButton>
      </>
    </BoxContainer>
  );
};

export default observer(ProjectTodoList);
