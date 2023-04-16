import React from "react";
import {
  Checkbox,
  Stack,
  Grid,
  Button,
  Box,
  MenuItem,
  Select,
  TextField,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { CircularProgress } from "@mui/joy";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import BoxContainer from "../../components/shared/BoxContainer";
import TodoProgress from "./Rightpane/TodoProgress";
import TodoInput from "./Rightpane/TodoInput";
import TodoDetailList from "./Rightpane/TodoDetailList";

const RightPane = () => {
  return (
    <>
      <TodoProgress></TodoProgress>
      <TodoInput></TodoInput>
      <TodoDetailList></TodoDetailList>
    </>
  );
};

export default RightPane;
