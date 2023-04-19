import React, { useState } from "react";
import BoxContainer from "../../../components/shared/BoxContainer";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

const StepsInput = ({
  addNewStep,
  title,
}: {
  title: string;
  addNewStep: (name: string, desc: string, priority: number) => void;
}) => {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    priority: 1,
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewStep(form.title, form.desc, form.priority);
    setForm({
      title: "",
      desc: "",
      priority: 1,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setForm((prev) => ({
      ...prev,
      priority: e.target.value as number,
    }));
  };

  return (
    <BoxContainer title={`${title}의 새 단계 추가`}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1} alignItems={"flex-end"}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            placeholder="이름을 추가하세요"
            name="title"
            value={form.title}
            onChange={handleChange}
          ></TextField>
          <TextField
            size="small"
            rows={3}
            placeholder="설명을 추가하세요"
            sx={{ width: "100%" }}
            name="desc"
            value={form.desc}
            onChange={handleChange}
          ></TextField>
          <Select
            size="small"
            placeholder="우선순위는?"
            sx={{ width: "100%" }}
            name="priority"
            value={form.priority}
            onChange={handleSelectChange}
          >
            <MenuItem value={1}>1순위</MenuItem>
            <MenuItem value={2}>2순위</MenuItem>
            <MenuItem value={3}>3순위</MenuItem>
          </Select>
          <Box>
            <Button type="submit">추가하기</Button>
          </Box>
        </Stack>
      </form>
    </BoxContainer>
  );
};

export default StepsInput;
