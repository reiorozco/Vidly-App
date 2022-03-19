import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

function Like({ liked, onClick }) {
  const getFavoriteIcon = () => {
    return !liked ? <FavoriteBorder /> : <Favorite />;
  };

  return <Button onClick={onClick}>{getFavoriteIcon()}</Button>;
}

Like.propTypes = { liked: PropTypes.bool, onClick: PropTypes.func };

export default Like;
