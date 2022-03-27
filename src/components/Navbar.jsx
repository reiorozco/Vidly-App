import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import MenuLoginNavbar from "./menuLoginNavbar";

function Navbar({ user }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    { name: "Movies", path: "/movies" },
    { name: "Customers", path: "/customers" },
    { name: "Rentals", path: "/rentals" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ marginBottom: 2 }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            variant="h5"
            noWrap
            color={"inherit"}
            underline={"none"}
            component={RouterLink}
            to={"/"}
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Vidly
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page.path}
                  color={"inherit"}
                  underline={"none"}
                  component={RouterLink}
                  to={page.path}
                  textAlign={"center"}
                >
                  <MenuItem onClick={handleCloseNavMenu}>{page.name}</MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Link
            variant="h5"
            noWrap
            color={"inherit"}
            underline={"none"}
            component={RouterLink}
            to={"/"}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Vidly
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page.path}
                color={"inherit"}
                underline={"none"}
                component={RouterLink}
                to={page.path}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>

            <MenuLoginNavbar
              anchorEl={anchorElUser}
              handleClose={handleCloseUserMenu}
              user={user}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
