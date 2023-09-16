import React, { useState, useEffect } from "react";
import {
  ListItemText,
  Drawer,
  Toolbar,
  Box,
  List,
  ListItemButton,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/Images/Tillit PNG.png";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
export default function Sidebar({ op, setOp }) {
  const location = useLocation();
  const [colors, setColor] = useState(0);
  const [showChild, setShowChild] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [SidebarData, setSidebarData] = useState([]);

  // useEffect(() => {
  //   setData1(JSON.parse(localStorage.getItem("role")));
  // }, [location.location]);

  const drawer = (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
          position: "relative",
          display: { md: "block", xs: "none" },
          minHeight: "100vh",
          width: "265px",
        },
      }}
    >
      <Toolbar
        sx={{ textAlign: "center", justifyContent: "center", py: 1 }}
      >
        <img
          src={Logo}
          style={{
            height: "100px",
            width: "100px",
          }}
        ></img>
      </Toolbar>
      <Divider />
      <Box>
        <List sx={{ px: "8px" }}>
          {SidebarData.length > 0
            ? SidebarData?.map((text, index) => {
              return (
                <>
                  <Link
                    to={text.path}
                    style={{
                      textDecoration: "none",
                      color: location.pathname.includes(text.path) ? "white" : "#464646",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        py: "5px",
                        px: "20px",
                        fontWeight: "500",
                        background: location.pathname.includes(text.path) ? "#085e15" : "#FFF",
                        borderRadius: "5px",
                        mt: "3px",
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#085e15",
                        },
                      }}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        setColor(index);
                        setShowChild(index);
                        if (index == showChild) {
                          setShowChild(0);
                        }
                      }}
                    >
                      <IconButton>
                        {hovered == index || location.pathname.includes(text.path) ? (text.icon == "DashboardIcon" ? <DashboardIcon sx={{ color: "#FFF" }} /> : text.icon == "ShoppingCartCheckoutIcon" ? <ShoppingCartCheckoutIcon sx={{ color: "#FFF" }} /> : text.icon == "InventoryIcon" ? <InventoryIcon sx={{ color: "#FFF" }} /> : text.icon == "CategoryIcon" ? <CategoryIcon sx={{ color: "#FFF" }} /> : text.icon == "TextSnippetIcon" ? <TextSnippetIcon sx={{ color: "#FFF" }} /> : "")
                          : (text.icon == "DashboardIcon" ? <DashboardIcon sx={{ color: "#464646" }} /> : text.icon == "ShoppingCartCheckoutIcon" ? <ShoppingCartCheckoutIcon sx={{ color: "#464646" }} /> : text.icon == "InventoryIcon" ? <InventoryIcon sx={{ color: "#464646" }} /> : text.icon == "CategoryIcon" ? <CategoryIcon sx={{ color: "#464646" }} /> : text.icon == "TextSnippetIcon" ? <TextSnippetIcon sx={{ color: "#464646" }} /> : "")}
                      </IconButton>
                      <ListItemText className="sidebar">
                        <span style={{ fontWeight: "500" }}>
                          {text.name}
                        </span>
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                </>
              );
            })
            : ""}
        </List>
      </Box>
    </Drawer>
  );




  useEffect(() => {
    setSidebarData([...JSON.parse(localStorage.getItem("role"))])
  }, [])
  return (
    <Box>
      {drawer}
      <Drawer
        variant="temporary"
        open={op}
        anchor="left"
        PaperProps={{
          sx: {
            position: "relative",
            width: "240px",
          },
        }}
        onClose={() => setOp(false)}
      >
        <Toolbar
          sx={{ textAlign: "center", justifyContent: "center", padding: 3 }}
        >
          <img src={Logo} style={{ width: "45%" }}></img>
        </Toolbar>
        {/* <Divider /> */}
        <Box>
          <List sx={{ px: "5px" }}>
            {SidebarData?.map((text, index) => {
              return (
                <>
                  <Link
                    to={text.path}
                    style={{
                      textDecoration: "none",
                      color:
                        location.pathname.includes(text.path) ? "white" : "#464646",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        background:
                          location.pathname.includes(text.path) ? "#2B3588" : "",
                        borderRadius: "5px",
                        mt: "3px",
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#2B3588",
                        },
                      }}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        setColor(index);
                        setShowChild(index);
                        if (index == showChild) {
                          setShowChild(0);
                        }
                      }}
                    >
                      <IconButton>
                        {hovered == index || location.pathname == text.path
                          ? React.createElement(text.icon, { color: "#FFF" })
                          : React.createElement(text.icon, {
                            color: "#464646",
                          })}
                      </IconButton>
                      <ListItemText primary={text.name} />
                      {text.child ? (
                        showChild == index ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )
                      ) : (
                        ""
                      )}
                    </ListItemButton>
                  </Link>
                  <Collapse
                    in={showChild == index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List disablePadding>
                      {text.child != false
                        ? text.child?.map((res) => {
                          return (
                            <Link
                              to={res.path}
                              style={{
                                textDecoration: "none",
                                color:
                                  location.pathname == res.path
                                    ? "white"
                                    : "#464646",
                              }}
                            >
                              <ListItemButton
                                sx={{
                                  background:
                                    location.pathname == res.path
                                      ? "#2B3588"
                                      : "",
                                  borderRadius: "5px",
                                  mt: "3px",
                                  "&:hover": {
                                    color: "white",
                                    backgroundColor: "#2B3588",
                                  },
                                }}
                              >
                                <ListItemText
                                  sx={{ ml: "30px" }}
                                  primary={res.name}
                                />
                              </ListItemButton>
                            </Link>
                          );
                        })
                        : ""}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
