import React from "react";
import BoxContainer from "../../../components/shared/BoxContainer";
import { Button, List, Stack } from "@mui/material";
import { Step } from "../../../state/Todo";
import TodoListItem2 from "../../../components/TodoListItem2";
import { observer } from "mobx-react";
import StepItem from "../../../components/StepItem";

const StepList = ({ list }: { list: Step[] }) => {
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
          {list.map((step) => {
            return <StepItem step={step}></StepItem>;
          })}
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

export default observer(StepList);
