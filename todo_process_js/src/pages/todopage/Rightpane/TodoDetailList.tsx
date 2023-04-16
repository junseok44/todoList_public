import React from "react";
import BoxContainer from "../../../components/shared/BoxContainer";
import { Button, List, Stack } from "@mui/material";
import TodoListItem from "../../../components/TodoListItem";

const TodoDetailList = () => {
  return (
    <BoxContainer>
      <>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <TodoListItem
            first="은행에서 환전 신청"
            second="5-7일 소요 예정"
          ></TodoListItem>
          <TodoListItem></TodoListItem>
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

export default TodoDetailList;
