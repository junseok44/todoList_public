import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox } from "@mui/material";
import { Step } from "../../state/Step";
let timer: NodeJS.Timeout | null;

const TodoListItemSub = ({ step }: { step: Step }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleMouseOver = (e: React.MouseEvent) => {
    console.log("mouse over");

    if (timer || isModalOpen) return;
    timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
  };

  return (
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
        onMouseOver={handleMouseOver}
        onMouseOut={() => {
          console.log("mouse out");

          if (timer) timer = null;
          setIsModalOpen(false);
        }}
      />
      {isModalOpen && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: -3,
              left: 130,
              transform: "translateX(-50%)",
              border: "10px solid transparent",
              borderBottom: "10px solid #b2bec3",
              transition: "opacity 0.5s ease",
              opacity: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "calc(-100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: "80%",
              background: "#b2bec3",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              padding: "0 1rem",
              boxSizing: "border-box",
              borderRadius: "5px",
              transition: "opacity 0.5s ease",
              opacity: 1,
            }}
          >
            modal
          </div>
        </>
      )}
    </ListItemButton>
  );
};

export default TodoListItemSub;
