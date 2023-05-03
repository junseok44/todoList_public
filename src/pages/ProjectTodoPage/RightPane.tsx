import TodoProgress from "./TodoProgress";
import StepsInput from "./StepInput";
import StepList from "./StepList";
import { observer } from "mobx-react";
import { useCurrentProjectTodos } from "../../state/ProjectStore";
import { Stack } from "@mui/material";

const RightPane = () => {
  const currentTodos = useCurrentProjectTodos();

  if (!currentTodos) return <div>select todos</div>;
  return (
    <Stack spacing={2}>
      <TodoProgress
        name={currentTodos.title}
        completedCount={currentTodos.completedItemCount}
        allStepsCount={currentTodos.allItemCount}
        progress={currentTodos.Progress}
        onClick={currentTodos.clearAllSteps}
      ></TodoProgress>
      <StepsInput
        title={currentTodos.title}
        addNewStep={currentTodos.createItem}
      ></StepsInput>
      <StepList
        list={currentTodos.list}
        deleteItem={currentTodos.deleteItem}
      ></StepList>
    </Stack>
  );
};

export default observer(RightPane);
