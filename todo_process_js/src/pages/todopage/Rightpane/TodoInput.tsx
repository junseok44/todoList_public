import React from "react";
import BoxContainer from "../../../components/shared/BoxContainer";
import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";

const TodoInput = () => {
  return (
    <BoxContainer title="환전하기의 새 단계 추가">
      <form>
        <Stack spacing={1} alignItems={"flex-end"}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            placeholder="이름을 추가하세요"
          ></TextField>
          <TextField
            size="small"
            rows={3}
            placeholder="설명을 추가하세요"
            sx={{ width: "100%" }}
          ></TextField>
          <Select size="small" placeholder="우선순위는?" sx={{ width: "100%" }}>
            <MenuItem>1순위</MenuItem>
          </Select>
          <Box>
            <Button>추가하기</Button>
          </Box>
        </Stack>
      </form>
    </BoxContainer>
  );
};

export default TodoInput;
