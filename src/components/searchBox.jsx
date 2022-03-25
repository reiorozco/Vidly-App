import React from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";

function SearchBox({ options, value, onChange }) {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        sx={{ marginBottom: 2 }}
        id="search-movie"
        freeSolo
        options={options.map((option) => option.title)}
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        renderInput={(params) => <TextField {...params} label="Search..." />}
      />
    </Stack>
  );
}

SearchBox.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export default SearchBox;
