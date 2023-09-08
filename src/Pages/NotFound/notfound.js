import React, { useEffect, useState } from "react";
// import MyDataGrid from "../Component/datagrid/datagrid";
import Box from "@mui/material/Box";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
// import { Arrow } from "../Assets/JSON/icons";
import { Link } from "react-router-dom";

function NoTFound() {
  
  return (
    <Box
      sx={{
        background: "white",
        width: "100%",
        backgroundColor: "#FFF",
        boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFF",
          px: "20px",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: "30px",
            pb: "30px",
            marginBottom: "2.5px",
          }}
        >
          <Typography
            component="h6"
            style={{ fontSize: "16px", lineHeight: "29px", fontWeight: "500" }}
          >
          404 Page Not Found
          </Typography>
          {/* <Link style={{ textDecoration: "none" }} to="/dashboard">
            <Button
              disableElevation
              variant="contained"
              style={{
                backgroundColor: "#2B3588",
                borderRadius: "3px",
                textDecoration: "none",
                textTransform: "none",
              }}
            >
              Page Not Found
            </Button>
          </Link> */}
        </Box>
      </Box>
      {/* 404 Error */}
      {/* <MyDataGrid columns={columns} rows={TaskData} id="TaskID" /> */}
    </Box>
  );
}

export default NoTFound;
