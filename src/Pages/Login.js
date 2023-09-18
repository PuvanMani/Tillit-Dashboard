import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Img from "../Assets/Images/Tillit PNG 2.png";
import Logo from "../Assets/Images/Tillit PNG 2.png";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Visibilityoff from "@mui/icons-material/VisibilityOffOutlined";
import { BASE_URL } from "../Config/Config";
import IconButton from "@mui/material/IconButton";

function Login() {
  const nav = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [pass, setPass] = useState(true);
  const [err, setErr] = useState({
    Email: false,
    Password: false,
  });
  const [errmsg, setErrmsg] = useState({
    Email: "Email Not Found",
    Password: "Check Your Password",
  });
  const onSubmit = () => {
    const err = {
      Email: Email == "",
      Password: Password == "",
    };
    setErr(err);
    if (Object.values(err).some((val) => val == true)) {

    } else {

      BASE_URL.post("/login", { Email, Password, RoleID: "6505498970d526ae411c3698" }).then(res => {
        if (res.data.Status) {
          localStorage.setItem("token", res.data.Message[1].Token)
          localStorage.setItem("userid", res.data.Message[0]._id)
          localStorage.setItem("role", JSON.stringify(res.data.Message[0].Role.Role))
          localStorage.setItem("rolename", res.data.Message[0].Role.RoleName)
          localStorage.setItem("email", res.data.Message[0].Email)
          localStorage.setItem("name", (res.data.Message[0].FullName))
          BASE_URL.create({
            headers: {
              email: res.data.Message[0].Email, token: res.data.Message[1].Token
            }
          })
          nav("/dashboard", { replace: true });
          window.location.reload();

        } else {
          if (res.data.Message == "Email Not Found") {
            const err = {
              Email: true,
              Password: false,
            };
            setErr(err);
          }
          else if (res.data.Message == "Wrong Password") {
            const err = {
              Email: false,
              Password: true,
            };
            setErr(err);
          }
        }
      })
    }
  }
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <Box sx={{ m: { xs: "20px", md: "30px" } }}>
      <Grid container sx={{ backgroundColor: "#FFF", borderRadius: "30px" }}>
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
            <img src={Logo} width='150px' />
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
            <Grid item xs={12}>
              <TextField
                error={err.Email}
                helperText={err.Email ? (Email == "" ? "Email is required" : errmsg.Email) : ""}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                label="Email"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={err.Password}
                helperText={err.Password ? (Password == "" ? "Password is required" : errmsg.Password) : ""}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                label="Password"
                size="small"
                type={pass == true ? "Password" : "text"}
                InputProps={{
                  endAdornment: Password ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setPass(!pass);
                        }}
                      >
                        {!pass ? (
                          <VisibilityIcon
                            sx={{ color: err.Password ? "#d32f2f" : "" }}
                          />
                        ) : (
                          <Visibilityoff
                            sx={{ color: err.Password ? "#d32f2f" : "" }}
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
            <Link
              to='/auth/signup'
              style={{
                textTransform: "none",
                textDecoration: "underline",
                color: "blue",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              I don't have Account. Sign Up ?
            </Link>
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
              backgroundColor: "#085e15",
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
