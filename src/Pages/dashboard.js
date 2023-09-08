import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  AvatarGroup,
  Avatar,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Darrow from "../Assets/Images/Downarrow.png";
import { BASE_URL } from "../Config/Config";
import moment from "moment";
import { AddUserIcon } from "../Assets/JSON/icons";

export const Teammember = (data, id) => {
  return (
    <AvatarGroup
      max={4}
      componentsProps={{
        additionalAvatar: {
          sx: {
            height: 30,
            width: 30,
            m: 0,
            fontSize: "14px",
            color: "#D25B68",
            background: "#F4D7DA",
          },
        },
      }}
      sx={{
        width: "65%",
      }}
    >
      {data
        ?.filter((val, ind) => {
          if (val.ProjectID == id) {
            return val;
          }
        })
        .map((mval) => {
          return (
            <Avatar
              sx={{ width: "30px", height: "30px" }}
              sizes="small"
              alt="Remy Sharp"
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            />
          );
        })}
    </AvatarGroup>
  );
};

export const TaskAvatar = (ival) => {

  return (
    <>
      {ival["EmployeeName"] == null ? (
        <Tooltip
          sx={{ cursor: "pointer" }}
          //   onClick={(e) => handleClick1(e, ival["TaskID"])}
          title="Add Member"
          arrow
        >
          <IconButton sx={{ p: 0, width: "30px", height: "30px", m: 0 }}>
            <AddUserIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <AvatarGroup
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            float: "left",
          }}
          max={3}
        //   onClick={handleClick}
        >
          {/* <Badge
            badgeContent="X"
            color="error"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClick={() => RemoveUser(ival["TaskID"])}
          > */}
          <Avatar
            sx={{ width: "30px", height: "30px" }}
            sizes="small"
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          />
          {/* </Badge> */}
          <Typography sx={{ ml: "10px", fontSize: "14px" }}>
            {ival["EmployeeName"]}
          </Typography>
        </AvatarGroup>
      )}
    </>
  );
};

export default function Dashboard() {
  const [projectData, setProjectData] = useState([]);
  const [workedproject, setworkedproject] = useState([]);
  const [todo, settodo] = useState([]);
  const [progress, setprogress] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [ProjectTeammembers, setProjectTeammembers] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [menuItems, setMenuItems] = useState([
    { id: 0, anchorEl: null },
    { id: 1, anchorEl: null },
    { id: 2, anchorEl: null },
    { id: 3, anchorEl: null },
    { id: 4, anchorEl: null },
  ]);
  const handleMenuOpen = (itemId, event) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.id === itemId ? { ...item, anchorEl: event.currentTarget } : item
    );
    setMenuItems(updatedMenuItems);
  };

  const handleMenuClose = (itemId) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.id === itemId ? { ...item, anchorEl: null } : item
    );
    setMenuItems(updatedMenuItems);
  };

  const listProject = () => {
    BASE_URL.post("/project/listall").then((res) => {
      if (res.data.Status) {
        setProjectData(res.data.Message[0].ProjectData);
        setProjectTeammembers(res.data.Message[0].TeamMember);
        setworkedproject(
          res.data.Message[0]?.ProjectData.filter((val, ind) => {
            if (
              val["ProjectStatus"]?.toLowerCase() == "to do" ||
              val["ProjectStatus"]?.toLowerCase() == "progress" ||
              val["ProjectStatus"]?.toLowerCase() == "completed"
            ) {
              return val;
            }
          })
        );
        settodo(
          res.data.Message[0].ProjectData.filter((val, ind) => {
            if (val["ProjectStatus"]?.toLowerCase() == "to do") {
              return val;
            }
          })
        );
        setprogress(
          res.data.Message[0].ProjectData.filter((val, ind) => {
            if (val["ProjectStatus"]?.toLowerCase() == "progress") {
              return val;
            }
          })
        );
        setcompleted(
          res.data.Message[0].ProjectData.filter((val, ind) => {
            if (String(val["ProjectStatus"])?.toLowerCase() == "completed") {
              return val;
            }
          })
        );
      }
    });
  };
  const listTask = () => {
    BASE_URL.post("/task/listall").then((res) => {
      if (res.data.Status) {
        setTaskData(res.data.Message);
        console.log(res.data.Message);
      }
    });
  };
  useEffect(() => {
    listProject();
    listTask();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3.5}>
        <Box
          sx={{ p: "11px 15px", background: "#FFFFFF", borderRadius: "12px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <DashboardIcon sx={{ color: "#000" }} />
                </Box>
                <Button
                  onClick={(event) => handleMenuOpen(0, event)}
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: "#000",
                  }}
                  endIcon={<img src={Darrow} />}
                >
                  Today
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={menuItems[0].anchorEl}
                  open={Boolean(menuItems[0].anchorEl)}
                  onClose={() => handleMenuClose(0)}
                >
                  <MenuItem onClick={() => handleMenuClose(0)}>
                    Last week
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClose(0)}>
                    Today
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: " #000" }} variant="caption">
                  Orders
                </Typography>
                <Typography>{projectData?.length}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: " #000" }} variant="caption">
                  Returns
                </Typography>
                <Typography>{workedproject?.length}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{ p: "11px 15px", background: "#FFFFFF", borderRadius: "12px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <MonetizationOnIcon sx={{ color: "#000" }} />
                </Box>
                <Button
                  onClick={(event) => handleMenuOpen(1, event)}
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: "#000",
                  }}
                  endIcon={<img src={Darrow} />}
                >
                  Today
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={menuItems[1].anchorEl}
                  open={Boolean(menuItems[1].anchorEl)}
                  onClose={() => handleMenuClose(1)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => handleMenuClose(1)}>
                    Last week
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClose(1)}>
                    Today
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: " #000" }} variant="caption">
                  Sale Amount
                </Typography>
                <Typography>10</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: " #000" }} variant="caption">
                  Sale Product
                </Typography>
                <Typography>10</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4.5}>
        <Box
          sx={{ p: "11px 15px", background: "#FFFFFF", borderRadius: "12px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <TextSnippetIcon sx={{ color: "#000" }} />
                </Box>
                <Button
                  onClick={(event) => handleMenuOpen(2, event)}
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: "#000",
                  }}
                  endIcon={<img src={Darrow} />}
                >
                  This Month
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={menuItems[2].anchorEl}
                  open={Boolean(menuItems[2].anchorEl)}
                  onClose={() => handleMenuClose(2)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => handleMenuClose(2)}>
                    Max
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClose(2)}>
                    This Month
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: " #000" }} variant="caption">
                  Orders
                </Typography>
                <Typography>{todo?.length}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: " #000" }} variant="caption">
                  Returns
                </Typography>
                <Typography>{progress?.length}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: " #000" }} variant="caption">
                  Delivered
                </Typography>
                <Typography>{completed?.length}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{ p: "11px 15px", background: "#FFFFFF", borderRadius: "12px" }}
        >
          <Box
            sx={{
              py: 1,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>Top Selling Product</Typography>
            </Box>
            <Button
              onClick={(event) => handleMenuOpen(3, event)}
              size="small"
              sx={{
                textTransform: "none",
                color: "#1C1D22",
              }}
              endIcon={<img src={Darrow} />}
            >
              Last 7 days
            </Button>
            <Menu
              anchorEl={menuItems[3].anchorEl}
              open={Boolean(menuItems[3].anchorEl)}
              onClose={() => handleMenuClose(3)}
            >
              <MenuItem onClick={() => handleMenuClose(3)}>
                Last 14 Days
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose(3)}>
                Last 21 Days
              </MenuItem>
            </Menu>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ border: "0px" }}>
                  <TableCell sx={{ border: "0px", p: 1 }}>HSN Code</TableCell>
                  <TableCell sx={{ border: "0px", p: 1 }}>Product Name</TableCell>
                  <TableCell sx={{ border: "0px", p: 1 }}>Order Date</TableCell>
                  <TableCell sx={{ border: "0px", p: 1 }}>Count</TableCell>
                  <TableCell sx={{ border: "0px", p: 1 }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {row.TaskName}
                    </TableCell>
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {TaskAvatar(row)}
                    </TableCell>
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {row.CreatedDate
                        ? moment(row["CreatedDate"]).format("DD/MM/YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {row.DueDate
                        ? moment(row["DueDate"]).format("DD/MM/YYYY")
                        : ""}
                    </TableCell>
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {row.EstimatedTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          sx={{ p: "11px 15px", background: "#FFFFFF", borderRadius: "12px" }}
        >
          <Box
            sx={{
              pb: 1,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">New Product</Typography>
            </Box>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ border: "0px", p: 1 }}>
                  <TableCell sx={{ border: "0px", p: 1 }}>
                    HSN Code
                  </TableCell>
                  <TableCell sx={{ border: "0px", p: 1 }}>
                    Priduct Name
                  </TableCell>
                  <TableCell sx={{ border: "0px", p: 1 }}>Created On</TableCell>
                  {/* <TableCell sx={{ border: "0px" }}>Due Date</TableCell> */}
                  <TableCell sx={{ border: "0px", p: 1 }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectData?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {row.ProjectName}
                    </TableCell>
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {Teammember(ProjectTeammembers, row.ProjectID)}
                    </TableCell>
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {row.CreatedDate
                        ? moment(row["CreatedDate"]).format("DD/MM/YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ border: 0, p: 1 }}>
                      {`${row.Duriation} Days`}
                      {/* {row.DueDate
                        ? moment(row["DueDate"]).format("DD/MM/YYYY")
                        : ""} */}
                    </TableCell>
                    {/* <TableCell>{`${row.Duration} Days`}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box
          sx={{ p: "11px 15px", background: "#FFFFFF", borderRadius: "12px" }}
        >
          <Box
            sx={{
              pb: 1,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>Reviews</Typography>
            </Box>
            <Button
              onClick={(event) => handleMenuOpen(4, event)}
              size="small"
              sx={{
                textTransform: "none",
                color: "#1C1D22",
              }}
              endIcon={<img src={Darrow} />}
            >
              Today
            </Button>
            <Menu
              elevation={0}
              anchorEl={menuItems[4].anchorEl}
              open={Boolean(menuItems[4].anchorEl)}
              onClose={() => handleMenuClose(4)}
            >
              <MenuItem onClick={() => handleMenuClose(4)}>Yesterday</MenuItem>
              {/* <MenuItem onClick={handleClose}></MenuItem> */}
            </Menu>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  px: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Avatar sx={{ width: "40px", height: "40px" }} />
                  <Box>
                    <Typography variant="body2">Name</Typography>
                    <Typography variant="caption" sx={{ opacity: "0.6" }}>
                      sccdvsvd dvdsvName
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ opacity: "0.6" }}>
                  6.49 PM
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  px: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Avatar sx={{ width: "40px", height: "40px" }} />
                  <Box>
                    <Typography variant="body2">Name</Typography>
                    <Typography variant="caption" sx={{ opacity: "0.6" }}>
                      sccdvsvd dvdsvName
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ opacity: "0.6" }}>
                  6.49 PM
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  px: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Avatar sx={{ width: "40px", height: "40px" }} />
                  <Box>
                    <Typography variant="body2">Name</Typography>
                    <Typography variant="caption" sx={{ opacity: "0.6" }}>
                      sccdvsvd dvdsvName
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ opacity: "0.6" }}>
                  6.49 PM
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  px: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Avatar sx={{ width: "40px", height: "40px" }} />
                  <Box>
                    <Typography variant="body2">Name</Typography>
                    <Typography variant="caption" sx={{ opacity: "0.6" }}>
                      sccdvsvd dvdsvName
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ opacity: "0.6" }}>
                  6.49 PM
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  px: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Avatar sx={{ width: "40px", height: "40px" }} />
                  <Box>
                    <Typography variant="body2">Name</Typography>
                    <Typography variant="caption" sx={{ opacity: "0.6" }}>
                      sccdvsvd dvdsvName
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ opacity: "0.6" }}>
                  6.49 PM
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
