import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import BoxContainer from "../../components/shared/BoxContainer";
import { observer } from "mobx-react";
import { useTodoStore } from "../../state/ProjectStore";

const LeftPane = () => {
  const projectStore = useTodoStore();

  if (!projectStore) return <div>no store..</div>;
  return (
    <BoxContainer title="프로젝트 리스트">
      <>
        <List>
          {projectStore.ProjectList.map(
            (
              project // Mapping through the array of items
            ) => (
              <ListItem key={project.id} disablePadding>
                <ListItemButton
                  onClick={() => projectStore.setCurrentProject(project.id)}
                >
                  {/* <ListItemText
                    primary={project.Progress + "%"}
                    sx={{ width: "max-content" }}
                  ></ListItemText> */}
                  <ListItemText>
                    <div
                      style={{
                        width: "90%",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {project.title}
                    </div>
                  </ListItemText>
                  <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
                    <span>{project.Progress + "%"}</span>
                    <ChevronRightIcon></ChevronRightIcon>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Button variant={"contained"}>
          <Link to="/" style={{ all: "unset" }}>
            이전 페이지로 돌아가기
          </Link>
        </Button>
      </>
    </BoxContainer>
  );
};

export default observer(LeftPane);
// export default LeftPane;
