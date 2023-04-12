import React from "react";
import { useState } from "react"; // Import useState hook from react
import TextField from "@mui/material/TextField"; // Import TextField component from @mui/material package
import Button from "@mui/material/Button"; // Import Button component from @mui/material package

const Input = () => {
  const [inputValue, setInputValue] = useState(""); // Declare state variable inputValue and its setter function setInputValue with initial value of empty string

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setInputValue(""); // Reset the input value to empty string
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the inputValue state variable with the current input value
  };

  return (
    // A form component with a text field and a submit button
    <form onSubmit={handleSubmit}>
      {/* Text field with a label, outlined variant, value and onChange event */}
      <TextField
        label="Enter text"
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
        sx={{ width: "80%" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ height: "100%", width: "20%" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Input;
