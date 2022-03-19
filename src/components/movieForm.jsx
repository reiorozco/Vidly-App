import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/movies");
  };

  return (
    <Box>
      <Typography variant={"h2"}>`MovieForm ${id}`</Typography>
      <Button variant={"contained"} onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}

export default MovieForm;
