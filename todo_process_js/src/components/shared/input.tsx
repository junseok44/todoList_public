import React from "react";
import { useState } from "react"; // Import useState hook from react
import TextField from "@mui/material/TextField"; // Import TextField component from @mui/material package
import Button from "@mui/material/Button"; // Import Button component from @mui/material package

const Input = ({
  placeholder,
  onSubmit,
}: {
  placeholder?: string;
  onSubmit: (title: string, desc: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(""); // Declare state variable inputValue and its setter function setInputValue with initial value of empty string

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSubmit(inputValue, "");
    setInputValue(""); // Reset the input value to empty string
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value); // Update the inputValue state variable with the current input value
  };

  return (
    // A form component with a text field and a submit button
    <form
      style={{ display: "flex", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <TextField
        variant="outlined"
        size="small"
        style={{ marginRight: "8px", flex: 1 }}
        value={inputValue}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder ? placeholder : ""}
      />{" "}
      <Button variant="contained" size="medium" type="submit">
        Submit
      </Button>{" "}
    </form>
  );
};

export default Input;
