import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("name");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#333', fontFamily: 'Montserrat, sans-serif' }}>
        <Toolbar
          sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> MetaYB 
            {role === "admin" ? " Dashboard" : " Employee "}
          </Typography>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ color: "white" }}
          >
            👋Hey {`${name}`} !.
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
