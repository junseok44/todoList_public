import TodoProgress from "./Rightpane/TodoProgress";
import StepsInput from "./Rightpane/StepInput";
import StepList from "./Rightpane/StepList";
import { observer } from "mobx-react";
import { useCurrentProjectTodos } from "../../state/ProjectStore";
import { Stack } from "@mui/material";

const RightPane = () => {
  // load current TodoItem.
  // 여기서 ui를 활용하지 않더라도.
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
