import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select as SelectMUI,
} from "@mui/material";
import PropTypes from "prop-types";

function Select({ name, label, seleOptions, error, ...rest }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth margin="normal" error={!!error}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <SelectMUI
          native
          label={label}
          inputProps={{
            name: `${name}`,
            id: `${name}`,
          }}
          {...rest}
        >
          <option value={""} />
          {seleOptions.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </SelectMUI>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </Box>
  );
}

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  seleOptions: PropTypes.array,
};

export default Select;
