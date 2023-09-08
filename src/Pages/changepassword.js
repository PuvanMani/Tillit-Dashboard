import { Button, Grid, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Config/Config";
import Swal from "sweetalert2";
  import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Visibilityoff from "@mui/icons-material/VisibilityOffOutlined";
function ChangePassword() {
  const nav = useNavigate();
  const [Password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ReNewPassword, setReNewPassword] = useState("");
  const [cpass,setcpass]=useState(false);
  const [newpas,setnewpas]=useState(false);
  const [setnew,setsetnew]=useState(false);

  let regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
  const [ErrorObj, setErrObj] = useState({
    password: false,
    newpassword: false,
    renewpassword: false,
  });

  const Change = () => {
    let ErrorObj2 = {
      password: Password == "",
      newpassword:
        NewPassword == "" ||
        NewPassword.length <= 7 ||
        regularExpression.test(
          NewPassword
        ) == false,
      renewpassword: ReNewPassword == "" || NewPassword != ReNewPassword,
    };
    setErrObj(ErrorObj2);
    if (Object.values(ErrorObj2).some((val) => val == true)) {
    } else {
      BASE_URL.post("/session/changepassword", {
        UserID: localStorage.getItem("userid"),
        Password,
        NewPassword,
      }).then((res) => {
        if (res.data.status) {
          Swal.fire(
            "Success!",
            "Your password has been updated successfully",
            "success"
          ).then(() => nav("/dashboard"));
        } else {
          if (res.data.Message == "Password is Wrong") {
            let ErrorObj2 = {
              password: "wrong",
              newpassword: false,
              renewpassword: false,
            };
            setErrObj(ErrorObj2);
          }
        }
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "white",
        mt: "40px",
        borderRadius: "10px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container sx={{ p: "40px" }}>
        <Grid item xs={12}>
          <InputLabel sx={{ mb: "6px" }}>Enter Current Password</InputLabel>
          <TextField
            error={ErrorObj["password"]}
            helperText={
              ErrorObj["password"] == "wrong"
                ? "Invalid current password"
                : ErrorObj["password"]
                  ? "Current password is required"
                  : ""
            }
             type={cpass == false ? "password" : "text"}
                InputProps={{
                  endAdornment: Password ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setcpass(!cpass);
                        }}
                      >
                        {cpass ? (
                          <VisibilityIcon
                            sx={{ color: ErrorObj["password"] ? "#d32f2f" : "" }}
                          />
                        ) : (
                          <Visibilityoff
                            sx={{color: ErrorObj["password"] ? "#d32f2f" : "" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    ""
                  ),
                }}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ my: "20px" }}>
          <InputLabel sx={{ mb: "6px" }}>Enter New Password</InputLabel>
          <TextField
            error={ErrorObj["newpassword"]}
            helperText={
              ErrorObj["newpassword"]
                ? NewPassword == ""
                  ? "New password is required"
                  :  regularExpression.test(
                    NewPassword
                  ) == false
                    ? "Enter a valid password"
                    : ""
                : "Minimum contain 8 characters and one uppercase letter,one lowercase letter, one number and one special character."
            }
            onChange={(e) => setNewPassword(e.target.value)}
            type={newpas == false ? "password" : "text"}
                InputProps={{
                  endAdornment: NewPassword ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setnewpas(!newpas);
                        }}
                      >
                        {newpas ? (
                          <VisibilityIcon
                            sx={{ color: ErrorObj["newpassword"] ? "#d32f2f" : "" }}
                          />
                        ) : (
                          <Visibilityoff
                            sx={{color: ErrorObj["newpassword"] ? "#d32f2f" : "" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    ""
                  ),
                }}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel sx={{ mb: "6px" }}>Confirm New Password</InputLabel>
          <TextField
            error={ErrorObj["renewpassword"]}
            helperText={
              ErrorObj["renewpassword"]
                ? ReNewPassword == ""
                  ? "Confirm password is required"
                  : ReNewPassword && ReNewPassword !== NewPassword
                    ? "Password doesn't match"
                    : ""
                : ""
            }
            onChange={(e) => setReNewPassword(e.target.value)}
            type={setnew == false ? "password" : "text"}
                InputProps={{
                  endAdornment: ReNewPassword ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setsetnew(!setnew);
                        }}
                      >
                        {setnew ? (
                          <VisibilityIcon
                            sx={{ color: ErrorObj["newpassword"] ? "#d32f2f" : "" }}
                          />
                        ) : (
                          <Visibilityoff
                            sx={{color: ErrorObj["newpassword"] ? "#d32f2f" : "" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    ""
                  ),
                }}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Button
            onClick={Change}
            disableElevation
            variant="contained"
            size="small"
            sx={{
              mr: "10px",
              backgroundColor: "#2B3588",
              "&:hover": { backgroundColor: "#2B3588" },
            }}
          >
            Submit
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              disableElevation
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#2B3588",
                "&:hover": { backgroundColor: "#2B3588" },
              }}
            >
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChangePassword;
