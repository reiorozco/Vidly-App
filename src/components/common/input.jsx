import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function Input({ error, ...rest }) {
  return error ? (
    <TextField error helperText={error} margin="normal" fullWidth {...rest} />
  ) : (
    <TextField margin="normal" required fullWidth {...rest} />
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
