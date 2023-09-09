import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  InputAdornment,
  MenuItem,
  TextField,
  Dialog,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Img from "../Assets/Images/login.jpg";
import Logo from "../Assets/Images/Tillit PNG.png";
import Checkbox from "@mui/material/Checkbox";
import { CkeckIco } from "../Assets/JSON/icons";
import { useContext } from "react";
import { loginContext } from "../App";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Visibilityoff from "@mui/icons-material/VisibilityOffOutlined";
import { BASE_URL } from "../Config/Config";
import IconButton from "@mui/material/IconButton";

function Login() {
  const nav = useNavigate();
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(true);
  const [err, setErr] = useState({
    employee: false,
    username: false,
    password: false,
  });
  const [errmsg, setErrmsg] = useState({
    username: "User Name is required",
    password: "Password is required",
  });
  const onSubmit = () => {
    const err = {
      username: username == "",
      password: password == "",
    };
    setErr(err);
    const verify = Object.values(err).every((val) => val == false);
    if (verify) {
      nav("/dashboard", { replace: true });
      // BASE_URL.get("/session/login", {
      //   headers: {
      //     username: username,
      //     password: password,
      //   },
      // }).then((res) => {
      //   if (res.data.status) {
      //     // if (res.data.Message != "") {
      //     //   // <Dialog
      //     //   //   fullWidth={true}
      //     //   //   maxWidth="sm"
      //     //   //   open={open}
      //     //   //   onClose={() => setOpen(false)}
      //     //   // >
      //     //   //   <DialogTitle>Error</DialogTitle>
      //     //   //   <DialogContent>
      //     //   //     <DialogContentText>
      //     //   //       You can set my maximum width and whether to adapt or not.
      //     //   //     </DialogContentText>
      //     //   //   </DialogContent>
      //     //   //   <DialogActions>
      //     //   //     <Button onClick={() => setOpen(false)}>Close</Button>
      //     //   //   </DialogActions>
      //     //   // </Dialog>;
      //     // }
      //     localStorage.setItem("username", res.data.Message[0].UserName);
      //     localStorage.setItem("rolename", res.data.Message[0].RoleName);
      //     localStorage.setItem("role", res.data.Message[0].Role);
      //     localStorage.setItem("userid", res.data.Message[0].UserID);
      //     localStorage.setItem("employeename", res.data.Message[0].EmployeeName);
      //     localStorage.setItem("designation", res.data.Message[0].Designation);
      //     localStorage.setItem("token", res.data.Message[0].token);
      //     BASE_URL.defaults.headers = {
      //       token: res.data.Message[0].token,
      //       userid: res.data.Message[0].UserID,
      //       username: res.data.Message[0].UserName,
      //     };
      //     nav("/dashboard", { replace: true });
      //   } else {
      //     if (res.data.Message == "User Name Is Wrong") {
      //       setErrmsg({ ...errmsg, username: res.data.Message });
      //       setErr({ ...err, username: true });
      //     } else {
      //       setErrmsg({ ...errmsg, password: res.data.Message });
      //       setErr({ ...err, password: true });
      //     }
      //   }
      // });
      // .catch((err) => {
      //   if (err.response.data.Message == "User Name Is Wrong") {
      //     setErrmsg({ ...errmsg, username: err.response.data.Message });
      //     setErr({ ...err, username: true });
      //   } else {
      //     setErrmsg({ ...errmsg, password: err.response.data.Message });
      //     setErr({ ...err, password: true });
      //   }
      // });
    }
  };
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <Box sx={{ m: { xs: "20px", md: "90px" } }}>
      <Grid container sx={{ backgroundColor: "#FFF", borderRadius: "30px" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <img src={Img} width="100%"></img>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            px: { xs: "20px", md: "60px" },
            py: { xs: "20px", md: "110px" },
            borderRight: "1px solid #C6C6C6",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src={Logo} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h5"
              sx={{ fontWeight: "700", fontSize: "24px !important" }}
            >
              Login
            </Typography>
            <Typography
              variant="span"
              component="p"
              sx={{
                color: "#676767",
                fontSize: "12px !important",
                mt: "10px",
                mb: "30px",
              }}
            >
              Please sign in to continue
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                select
                defaultValue=""
                onChange={(e) => setType(e.target.value)}
                fullWidth
                error={err.type}
                helperText={err.type ? "Please select the your role" : ""}
                variant="outlined"
                label="Select Login Profile"
                size="small"
              >
                <MenuItem value="E">Employee</MenuItem>
                <MenuItem value="I">Intern</MenuItem>
              </TextField>
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                error={err.username}
                helperText={
                  err.username
                    ? username == ""
                      ? "Username is required"
                      : errmsg.username
                    : ""
                }
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                variant="outlined"
                label="User Name"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={err.password}
                helperText={
                  err.password
                    ? password == ""
                      ? "Password is required"
                      : errmsg.password
                    : ""
                }
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                label="Password"
                size="small"
                type={pass == true ? "password" : "text"}
                InputProps={{
                  endAdornment: password ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setPass(!pass);
                        }}
                      >
                        {!pass ? (
                          <VisibilityIcon
                            sx={{ color: err.password ? "#d32f2f" : "" }}
                          />
                        ) : (
                          <Visibilityoff
                            sx={{ color: err.password ? "#d32f2f" : "" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    ""
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="span"
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                my: "10px",
                color: "#676767",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              {/* <Checkbox disableRipple size="medium" /> */}
              <Checkbox
                disableRipple
                size="small"
                icon={<CkeckIco sx={{ width: "26px", height: "26px" }} />}
                sx={{
                  fontWeight: 400,
                  p: 0,
                  mr: "10px",
                  width: "26px",
                  "&.Mui-checked": {
                    mr: "10px",
                    py: "5px",
                    color: "#2B3588",
                    transform: "scale(1.9)",
                  },
                }}
              />
              Remember Me
            </Typography>
            <Button
              sx={{
                textTransform: "none",
                color: "#676767",
                fontSize: "12px !important",
              }}
            >
              Forget Password ?
            </Button>
          </Box>
          <Button
            onClick={onSubmit}
            disableElevation
            variant="contained"
            style={{
              backgroundColor: "#2B3588",
              fontWeight: "700",
              borderRadius: "5px",
              fontSize: "24px !important",
              textTransform: "none",
              height: "50px",
            }}
            fullWidth
          >
            Login
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            px: "20px",
          }}
        >
          <Box>
            <img src={Img} width="100%"></img>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
