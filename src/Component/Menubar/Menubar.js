import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";
import { Notifi } from "../../Assets/JSON/icons";
import Sidebar from "../SideBar/Sidebar";
import { BASE_URL } from "../../Config/Config";
import moment from "moment";
export default function Menubar() {
  const [op, setOp] = useState(false);
  const [Profile, setProfile] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const nav = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    BASE_URL.post('/employee/listbyid', { UserID: localStorage.getItem('userid') }).then((res) => {
      setProfile(res.data.Message[0].Profile)
    })
  })
  const viewProfile = () => {
    nav("/employeeinfo");
    setAnchorEl(null);
  };
  return (
    <Box>
      <AppBar
        elevation={0}
        position="relative"
        sx={{
          color: "#464646",
          paddingLeft: 0,
          backgroundColor: "#FFF",
          boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
          // mx: { md: "20px", lg: "0px" }
        }}
      >
        <Toolbar
          style={{ padding: { xs: 0, md: 2 }, color: "#363636", width: "auto" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1.6,
                justifyContent: "space-between",
              }}
            >
              <IconButton
                sx={{
                  m: 0,
                  paddingRight: { xs: 0, sm: 1 },
                  display: { md: "none", xs: "block" },
                }}
                onClick={() => setOp(true)}
              >
                <MenuIcon sx={{ width: "30px", fontWeight: "bold" }} />
              </IconButton>
              <div>
                <Typography className="admin-heading">
                  Hello, Puvan {localStorage.getItem("employeename")} !
                </Typography>
                <Typography className="date">
                  {moment(new Date().toLocaleDateString()).format("DD-MM-YYYY")}
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { md: "space-between", xs: "none" },
                alignItems: "center",
              }}
            >
              <Typography
                component="h6"
                style={{ display: "flex", fontWeight: "500" }}
              >
                EN{" "}
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ExpandMoreIcon />
                </span>
              </Typography>
              <IconButton
                sx={{
                  backgroundColor: "#2B3588",
                  mr: "5px",
                  p: "10px",
                  "&:hover": { backgroundColor: "#2B3588" },
                }}
              >
                {" "}
                {React.createElement(Notifi)}
              </IconButton>
              <Avatar
                sx={{ cursor: "pointer" }}
                onClick={handleClick}
                alt="Remy Sharp"
                src={"https://i.pravatar.cc/300"}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={viewProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="changepassword"
                  >
                    Change Password
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.clear();
                    nav("/login");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {op ? <Sidebar op={op} setOp={setOp} /> : ""}
    </Box>
  );
}
