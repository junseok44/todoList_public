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
import BoxContainer from "../../components/BoxContainer";
import { observer } from "mobx-react";
import { useTodoStore } from "../../state/ProjectStore";
import ProjectList_Item from "./ProjectList_Item";

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
              <ProjectList_Item
                project={project}
                key={project.id}
                setCurrentProject={projectStore.setCurrentProject}
              ></ProjectList_Item>
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
