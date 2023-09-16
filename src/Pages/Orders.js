import React, { useEffect, useState } from "react";
import MyDataGrid from "../Component/datagrid/datagrid";
import Box from "@mui/material/Box";
import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Arrow } from "../Assets/JSON/icons";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { BASE_URL } from "../Config/Config";
import moment from "moment";
import { Sweetalert } from "../Component/sweetalert/sweetalert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';


function Orders() {
  const [ListOrder, setListOrder] = useState([]);

  const ListTask = () => {
    BASE_URL.post("/order/list").then((res) => {
      setListOrder([...res.data.Message]);
    });
  };
  const Delete = (TaskID) => {
    BASE_URL.post("/timesheet/deletesheet", { TaskID }).then((res) => {
      let x = res.data.Status ? ListTask() : "";
    });
  };
  useEffect(() => {
    ListTask();
  }, []);

  const columns = [
    {
      headerAlign: "left",
      field: "FullName",
      headerName: "Customer Name",
      width: 250,
      sortable: false,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 500,
      sortable: false,
    },
    {
      field: "City",
      headerName: "Pincode",
      width: 150,
      sortable: false,
    },
    {
      field: "PhoneNumber",
      headerName: "Phone",
      width: 150,
      sortable: false,
    },
    {
      field: "Status",
      headerName: "Status",
      filter: false,
      width: 110,
      sortable: false,
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton>
            <Tooltip title="View" arrow>
              <Link to={`/timesheet/view/${params.row.TaskID}`}><VisibilityIcon sx={{ color: '#5f49d3' }} /></Link>
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="Edit" arrow>
              <Link to={`/timesheet/edit/${params.row.TaskID}`}><BorderColorIcon sx={{ color: '#5f49d3' }} /></Link>
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() =>
              Sweetalert("Are you sure?").then((res) =>
                res ? Delete(params.row._id) : ""
              )
            }
          >
            <Tooltip title="Delete" arrow>
              <Link>
                <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
              </Link>
            </Tooltip>
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
                justifyContent: "space-between",
                alignItems: "center",
                pt: "10px",
                pb: "10px",
                marginBottom: "2.5px",
              }}
            >
              <Typography
                component="h6"
                style={{ fontSize: "16px", lineHeight: "29px", fontWeight: "500" }}
              >
                Today Orders
              </Typography>
              {/* <Link style={{ textDecoration: "none" }} to="/timesheet/create">
                <Button
                  disableElevation
                  variant="contained"
                  style={{
                    backgroundColor: "#8c0000",
                    borderRadius: "3px",
                    textDecoration: "none",
                    textTransform: "none",
                  }}
                >
                  Add Time Sheet
                </Button>
              </Link> */}
            </Box>
          </Box>
          <MyDataGrid columns={columns} rows={ListOrder} id="_id" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Orders;
