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
        name={currentTodos.name}
        completedCount={currentTodos.completedSteps}
        allStepsCount={currentTodos.allStepsCount}
        progress={currentTodos.Progress}
      ></TodoProgress>
      <StepsInput
        title={currentTodos.name}
        addNewStep={currentTodos.addNewStep}
      ></StepsInput>
      <StepList list={currentTodos.steps}></StepList>
    </>
  );
};

export default observer(RightPane);
