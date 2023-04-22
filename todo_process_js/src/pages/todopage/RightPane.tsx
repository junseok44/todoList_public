import TodoProgress from "./Rightpane/TodoProgress";
import StepsInput from "./Rightpane/StepInput";
import StepList from "./Rightpane/StepList";
import { useCurrentProjectTodos } from "../../state/Todo";
import { observer } from "mobx-react";

const RightPane = () => {
  // load current TodoItem.
  // 여기서 ui를 활용하지 않더라도.
  const currentTodos = useCurrentProjectTodos();

  if (!currentTodos) return <div>select todos</div>;
  return (
    <>
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
    </>
  );
};

export default observer(RightPane);
