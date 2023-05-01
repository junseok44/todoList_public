import React, { useState } from "react";
import { Stack, Container, Grid, Box, Typography, Button } from "@mui/material"; // Importing Container and Grid components from @mui/material package
import BoxContainer from "./shared/BoxContainer";
import CardComponent from "./shared/CardComponent";
import { observer } from "mobx-react";
import { Project } from "../state/Project";

const ProjectList = ({
  list,
  setCurrentProject,
  deleteProject,
}: {
  list: Project[];
  setCurrentProject: (id: string) => void;
  deleteProject: (id: string) => void;
}) => {
  const [isSelect, setIsSelect] = useState(false);
  const [deleteArr, setDeleteArr] = useState<string[]>([]);

  const handleDeleteAllProject = () => {
    deleteArr.map((id) => {
      deleteProject(id);
    });
    setIsSelect(false);
    setDeleteArr([]);
  };

  const addToDeleteArr = (id: string) => {
    if (!deleteArr.includes(id)) setDeleteArr((prev) => [...prev, id]);
    else setDeleteArr((prev) => prev.filter((itemId) => itemId != id));
  };

  return (
    <BoxContainer>
      <>
        <Stack
          direction="row"
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          mb={3}
        >
          <Typography variant="h5"> project list</Typography>
          <Stack direction="row">
            <Button onClick={() => setIsSelect(!isSelect)}>
              {isSelect ? "취소" : "리스트 편집하기"}
            </Button>
            {isSelect && (
              <>
                <Button onClick={handleDeleteAllProject}>삭제하기</Button>
                <Button>{deleteArr.length}개 선택됨</Button>
              </>
            )}
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          {list.map((item) => (
            <Grid
              key={item.id}
              item
              container
              md={4}
              sm={6}
              xs={12}
              justifyContent={"center"}
            >
              <CardComponent
                key={item.id}
                id={item.id}
                title={item.title}
                desc={item.desc}
                file={item.thumbNailFile}
                progress={item.Progress}
                onSubmit={item.changeData}
                isSelectMode={isSelect}
                isSelected={deleteArr.includes(item.id)}
                onClick={setCurrentProject}
                onSelected={addToDeleteArr}
              ></CardComponent>
            </Grid>
          ))}
        </Grid>
      </>
    </BoxContainer>
  );
};

export default observer(ProjectList);
