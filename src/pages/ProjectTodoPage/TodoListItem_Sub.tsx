import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox } from "@mui/material";
import { Step } from "../../state/Step";
import ItemMenuModal from "../../components/ItemMenuModal";

let timer: NodeJS.Timeout | null;
let clearTimer: NodeJS.Timeout | null;

let inCount: number = 0;
let outCount: number = 0;

const TodoListItemSub = ({ step }: { step: Step }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleMouseOver = (e: React.MouseEvent) => {
    inCount += 1;
    console.log("mouse in", inCount);
    if (clearTimer) clearTimeout(clearTimer);

    timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 600);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    outCount += 1;
    console.log("mouse out", outCount);
    if (timer) clearTimeout(timer);

    clearTimer = setTimeout(() => {
      setIsModalOpen(false);
    }, 500);
  };

  return (
    <div
      onMouseOverCapture={handleMouseOver}
      onMouseOutCapture={handleMouseOut}
      style={{ zIndex: 100 }}
    >
      <ListItemButton
        sx={{ pl: 4, position: "relative" }}
        onClick={() => {
          step.done = !step.done;
        }}
      >
        <ListItemIcon>
          <Checkbox
            checked={step.done}
            edge={"start"}
            onMouseOver={(e) => e.stopPropagation()}
          ></Checkbox>
        </ListItemIcon>
        <ListItemText
          primary={step.title}
          // secondary={"현재 진행중"}
          secondaryTypographyProps={{ style: { color: "red" } }}
        />
        <ItemMenuModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        ></ItemMenuModal>
      </ListItemButton>
    </div>
  );
};

export default TodoListItemSub;
