import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function Input(props) {
  const { error, onChange, label, name, value } = props;

  return error ? (
    <TextField
      error
      id={name}
      value={value}
      name={name}
      label={label}
      onChange={onChange}
      helperText={error}
      margin="normal"
      fullWidth
    />
  ) : (
    <TextField
      id={name}
      value={value}
      name={name}
      label={label}
      onChange={onChange}
      margin="normal"
      required
      fullWidth
      {...props}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
export default Input;
