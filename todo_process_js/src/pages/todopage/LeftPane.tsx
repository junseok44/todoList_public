import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import BoxContainer from "../../components/shared/BoxContainer";

const LeftPane = () => {
  const items = ["project 1", "project 2", "project 3"]; // Creating an array of items

  return (
    <>
      <BoxContainer title="프로젝트 리스트">
        <>
          <Button variant={"contained"}>
            <Link to="/" style={{ all: "unset" }}>
              이전 페이지로 돌아가기
            </Link>
          </Button>
          <List>
            {items.map(
              (
                item // Mapping through the array of items
              ) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item} />
                    <ListItemIcon>
                      <ChevronRightIcon></ChevronRightIcon>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </>
      </BoxContainer>
    </>
  );
};

export default LeftPane;
