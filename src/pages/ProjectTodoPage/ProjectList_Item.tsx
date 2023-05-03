import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Project } from "../../state/Project";

const ProjectList_Item = ({
  project,
  setCurrentProject,
}: {
  project: Project;
  setCurrentProject: (id: string) => void;
}) => {
  return (
    <ListItem key={project.id} disablePadding>
      <ListItemButton onClick={() => setCurrentProject(project.id)}>
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
  );
};

export default ProjectList_Item;
