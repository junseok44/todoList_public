import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, Checkbox, TextField } from "@mui/material";
import { Step } from "../../state/Step";
import ItemMenuModal from "../../components/ItemMenuModal";
import useModal from "../../hook/useModal";
import { action } from "mobx";
import { observer } from "mobx-react";

const TodoListItemSub = ({ step }: { step: Step }) => {
  const { handleMouseOver, handleMouseOut, isModalOpen } = useModal();
  const [isEdit, setIsEdit] = React.useState(false);
  const [editValue, setEditValue] = React.useState(step.title);

  return (
    <ListItemButton
      sx={{ pl: 4, position: "relative" }}
      onClick={() => {
        step.done = !step.done;
      }}
      onMouseOverCapture={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <ListItemIcon>
        <Checkbox
          checked={step.done}
          edge={"start"}
          onMouseOver={(e) => e.stopPropagation()}
        ></Checkbox>
      </ListItemIcon>
      {!isEdit ? (
        <ListItemText
          primary={step.title}
          secondary={step.onProgress ? "현재 진행중" : null}
          secondaryTypographyProps={{ style: { color: "green" } }}
        />
      ) : (
        <TextField
          size="small"
          value={editValue}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setEditValue(e.target.value);
            step.title = e.target.value;
          }}
        ></TextField>
      )}

      <ItemMenuModal
        isModalOpen={isModalOpen}
        // setIsModalOpen={setIsModalOpen}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            step.forToday = !step.forToday;
          }}
        >
          오늘 할 일
        </Button>
        <Button
          onClick={action((e: React.MouseEvent) => {
            e.stopPropagation();
            step.onProgress = !step.onProgress;
          })}
        >
          {step.onProgress ? "진행 아님" : "진행중"}
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsEdit(!isEdit);
          }}
        >
          {isEdit ? "저장" : "이름 변경"}
        </Button>
      </ItemMenuModal>
    </ListItemButton>
  );
};

export default observer(TodoListItemSub);
