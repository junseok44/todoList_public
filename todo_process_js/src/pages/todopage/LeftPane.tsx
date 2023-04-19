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
import { useTodoStore } from "../../state/Todo";
import { observer } from "mobx-react";

const LeftPane = () => {
  const projectStore = useTodoStore();

  if (!projectStore) return <div>no store..</div>;
  return (
    <Grid item md={4} xs={12}>
      <BoxContainer title="프로젝트 리스트">
        <>
          <Button variant={"contained"}>
            <Link to="/" style={{ all: "unset" }}>
              이전 페이지로 돌아가기
            </Link>
          </Button>
          <List>
            {projectStore.ProjectList.map(
              (
                project // Mapping through the array of items
              ) => (
                <ListItem key={project.id} disablePadding>
                  <ListItemButton
                    onClick={() => projectStore.setCurrentProject(project.id)}
                  >
                    <ListItemText primary={project.title} />
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
    </Grid>
  );
};

export default observer(LeftPane);
// export default LeftPane;
