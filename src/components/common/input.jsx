import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function Input({ error, ...rest }) {
  return (
    <TextField
      error={!!error}
      helperText={error}
      margin="normal"
      fullWidth
      {...rest}
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
