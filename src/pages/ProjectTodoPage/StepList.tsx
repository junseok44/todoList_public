import React, { useState } from "react";
import BoxContainer from "../../components/BoxContainer";
import { Button, List, Stack } from "@mui/material";
import TodoListItem2 from "./TodoListItem";
import { observer, useStaticRendering } from "mobx-react";
import StepItem from "./StepItem";
import { Step } from "../../state/Step";

const StepList = ({
  list,
  deleteItem,
}: {
  list: Step[];
  deleteItem: (id: string) => void;
}) => {
  const [isEdit, setisEdit] = useState(false);
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
            return (
              <StepItem
                step={step}
                isEdit={isEdit}
                onDelete={deleteItem}
              ></StepItem>
            );
          })}
        </List>
        <Stack direction="row" justifyContent={"flex-end"}>
          <Button
            color="error"
            variant="outlined"
            onClick={() => setisEdit(!isEdit)}
          >
            {isEdit ? <span>close</span> : <span>edit</span>}
          </Button>
        </Stack>
      </>
    </BoxContainer>
  );
};

export default observer(StepList);
