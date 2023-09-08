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
function Orders() {
  const [TaskData, setTaskData] = useState([]);

  const ListTask = () => {
    BASE_URL.post("/timesheet/listall").then((res) => {
      setTaskData([...res.data.Message]);
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
      field: "TaskName",
      headerName: "Task Name",
      width: 250,
      sortable: false,
    },
    {
      field: "TaskDate",
      headerName: "Date",
      width: 150,
      sortable: false,
      valueGetter: (params) => moment(params?.value).format("DD-MM-YYYY"),
    },
    {
      field: "ProjectName",
      headerName: "Project/Product Name",
      width: 150,
      sortable: false,
    },
    {
      field: "StartTime",
      headerName: "Start Time",
      width: 150,
      sortable: false,
      valueGetter: (params) => moment(params?.value, "hh:mm").format("hh:mm A"),
    },
    {
      field: "EndTime",

      headerName: "End Time",
      headerAlign: "left",
      filter: false,
      align: "left",
      width: 110,
      sortable: false,
      valueGetter: (params) => moment(params?.value, "hh:mm").format("hh:mm A"),
    },
    {
      field: "Totalhoures",
      headerName: "Total Hours (HH:MM:SS)",
      headerAlign: "left",
      filter: false,
      align: "left",
      width: 150,
      sortable: false,
      valueGetter: (params) => params?.value.slice(0, 5),
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          {/* <IconButton>
            <Tooltip title="View" arrow>
              <Link to={`/timesheet/view/${params.row.TaskID}`}><VisibilityOutlinedIcon sx={{ color: '#5f49d3' }} /></Link>
            </Tooltip>
          </IconButton >
          <IconButton>
            <Tooltip title="Edit" arrow>
              <Link to={`/timesheet/edit/${params.row.TaskID}`}><ModeEditOutlineOutlinedIcon sx={{ color: '#5f49d3' }} /></Link>
            </Tooltip>
          </IconButton> */}
          <IconButton
            onClick={() =>
              Sweetalert("Are you sure?").then((res) =>
                res ? Delete(params.row.TaskID) : ""
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
                Today Orderd
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
          <MyDataGrid columns={columns} rows={TaskData} id="TaskID" />
        </Box>
      </Grid>
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
                Return Orderd
              </Typography>
            </Box>
          </Box>
          <MyDataGrid columns={columns} rows={TaskData} id="TaskID" />
        </Box>
      </Grid>
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
                Success Delivery
              </Typography>
            </Box>
          </Box>
          <MyDataGrid columns={columns} rows={TaskData} id="TaskID" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Orders;
