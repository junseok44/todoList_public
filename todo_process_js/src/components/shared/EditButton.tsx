import { useState } from "react";
import { Button, Stack } from "@mui/material";

// Define props interface
interface EditButtonProps {
  color?: "primary" | "secondary" | "error";
  variant?: "contained" | "outlined" | "text";
  isEdit: boolean;
  setisEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define component
const EditButton: React.FC<EditButtonProps> = ({
  color = "error",
  variant = "outlined",
  isEdit,
  setisEdit,
}) => {
  // Define state

  // Return JSX
  return (
    <Stack direction="row" justifyContent={"flex-end"}>
      <Button
        color={color}
        variant={variant}
        onClick={() => setisEdit(!isEdit)}
      >
        {isEdit ? <span>close</span> : <span>edit</span>}
      </Button>
    </Stack>
  );
};

export default EditButton;
