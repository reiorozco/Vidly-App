import React from "react";
import { Link, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

function MenuLoginNavbar({ anchorEl, handleClose, user }) {
  const userSettings = [
    { name: "Profile", path: "/profile" },
    { name: "Account", path: "/account" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logout", path: "/logout" },
  ];
  const logSettings = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {(!user ? logSettings : userSettings).map((setting) => (
        <Link
          key={setting.path}
          color={"inherit"}
          underline={"none"}
          component={RouterLink}
          to={setting.path}
          textAlign={"center"}
        >
          <MenuItem onClick={handleClose}>{setting.name}</MenuItem>
        </Link>
      ))}
    </Menu>
  );
}

MenuLoginNavbar.propTypes = {
  anchorEl: PropTypes.any,
  handleClose: PropTypes.func,
  user: PropTypes.object,
};

export default MenuLoginNavbar;
