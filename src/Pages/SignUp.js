import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    Grid,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Img from "../Assets/Images/Tillit PNG 2.png";
import Logo from "../Assets/Images/Tillit PNG 2.png";
import Checkbox from "@mui/material/Checkbox";
import { CkeckIco } from "../Assets/JSON/icons";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Visibilityoff from "@mui/icons-material/VisibilityOffOutlined";
import { BASE_URL } from "../Config/Config";
import IconButton from "@mui/material/IconButton";
import OtpInput from 'react-otp-input';
import OTPInput from "react-otp-input";
import { Createalert } from "../Component/sweetalert/sweetalert";
function SignUp() {
    const nav = useNavigate();

    const [Agree, setAgree] = useState(false);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [City, setCity] = useState("");
    const [Pincode, setPincode] = useState("");
    const [StoreName, setStoreName] = useState("");
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [otp, setOtp] = useState('');
    const [OTP, setOTP] = useState('');
    const [WrongOTP, setWrongOTP] = useState(false);

    const [Dial, setDial] = useState(false);
    const [pass, setPass] = useState(true);
    const [err, setErr] = useState({
        FirstName: false,
        LastName: false,
        PhoneNumber: false,
        Address: false,
        City: false,
        Pincode: false,
        UserName: false,
        Password: false,

    });
    const [errmsg, setErrmsg] = useState({
        UserName: "User Name is required",
        Password: "Password is required",
    });
    const GetOTP = () => {
        const err = {
            FirstName: FirstName == "",
            LastName: LastName == "",
            PhoneNumber: PhoneNumber == "",
            Address: Address == "",
            City: City == "",
            Pincode: Pincode == "",
            UserName: UserName == "",
            Password: Password == "",
        };
        setErr(err);
        if (Object.values(err).some((val) => val == true)) {

        } else {
            setDial(true)

            let data = { FirstName, LastName, Address, City, Pincode, UserName, Password, StoreName, Email, PhoneNumber, Role: "Seller", TermsAndCondition: Agree }
            BASE_URL.post("/verifyemail", data).then(res => {
                if (res.data.Status) {
                    const OTP = res.data.Message.OTP
                    setOTP(OTP)
                } else {
                    setDial(false)
                }
            })
        }
    }
    const onSubmit = () => {
        const err = {
            FirstName: FirstName == "",
            LastName: LastName == "",
            PhoneNumber: PhoneNumber == "",
            Address: Address == "",
            City: City == "",
            Pincode: Pincode == "",
            UserName: UserName == "",
            Password: Password == "",
        };
        setErr(err);
        if (Object.values(err).some((val) => val == true)) {

        } else {
            if (Number(otp) == OTP) {
                setWrongOTP(false)
                let data = { FirstName, LastName, Address, City, Pincode, UserName, Password, StoreName, PhoneNumber, Role: "Seller", TermsAndCondition: Agree }
                BASE_URL.post("/signup", data).then(res => {
                    if (res.data.Status) {
                        Createalert("Account is")
                        nav('/auth/login')
                    } else {
                        if (res.data.Message == 'UserName Already Exist') {
                            setDial(true)
                            setWrongOTP(false)
                        }
                    }
                })
            } else {
                setWrongOTP(true)
            }
        }
    };
    useEffect(() => {
        localStorage.clear()
    }, [])
    return (
        <Box sx={{ m: { xs: 1, sm: 3 } }}>
            <Grid container sx={{ backgroundColor: "#FFF", borderRadius: "30px" }}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        px: { xs: "20px", md: "40px" },
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
                            Sign Up
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
                            Please Register to continue
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={err.FirstName}
                                helperText={
                                    err.FirstName ? FirstName == "" ? "First Name is required" : "" : ""
                                }
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={err.LastName}
                                helperText={
                                    err.LastName ? LastName == "" ? "Last Name is required" : "" : ""
                                }
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={err.PhoneNumber}
                                helperText={
                                    err.PhoneNumber ? PhoneNumber == "" ? "Phone is required" : "" : ""
                                }
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="Phone Number"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={err.Email}
                                helperText={
                                    err.Email ? Email == "" ? "Email is required" : "" : ""
                                }
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="Email"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={err.Address}
                                helperText={
                                    err.Address ? Address == "" ? "Address is required" : "" : ""
                                }
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="House No, Street, Address"
                                size="small"
                            />
                            <p style={{ fontSize: "12px", color: "#808080", marginLeft: "5px" }}>(Pickup Address)</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={err.City}
                                helperText={
                                    err.City ? City == "" ? "City is required" : "" : ""
                                }
                                onChange={(e) => setCity(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="City"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={err.Pincode}
                                helperText={
                                    err.Pincode ? Pincode == "" ? "Pincode is required" : "" : ""
                                }
                                onChange={(e) => setPincode(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="Pincode"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={err.StoreName}
                                helperText={
                                    err.StoreName ? StoreName == "" ? "Store Name is required" : "" : ""
                                }
                                onChange={(e) => setStoreName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="Store Name"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={err.UserName}
                                helperText={
                                    err.UserName ? UserName == "" ? "UserName is required" : errmsg.UserName : ""
                                }
                                onChange={(e) => setUserName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                label="User Name"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={err.Password}
                                helperText={
                                    err.Password ? Password == "" ? "Password is required" : errmsg.Password : ""
                                }
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                label="Password"
                                size="small"
                                type={pass == true ? "Password" : "text"}
                                InputProps={{
                                    endAdornment: Password ? (<InputAdornment position="end">    <IconButton onClick={() => { setPass(!pass); }}    >        {!pass ? (<VisibilityIcon sx={{ color: err.Password ? "#d32f2f" : "" }} />) : (<Visibilityoff sx={{ color: err.Password ? "#d32f2f" : "" }} />)}    </IconButton></InputAdornment>
                                    ) : (""
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                        <Typography sx={{ fontSize: "12px", mt: "10px", }}>

                            <Checkbox
                                disableRipple
                                onChange={() => setAgree(!Agree)}
                                size="small"
                                icon={<CkeckIco sx={{ width: "26px", height: "26px" }} />}
                                sx={{
                                    fontWeight: 400,
                                    p: 0,
                                    mr: "10px",
                                    width: "16px",
                                    "&.Mui-checked": {
                                        mr: "10px",
                                        py: "5px",
                                        color: "#085e15",
                                    },
                                }}
                            />
                            Agree Terms and Conditions
                        </Typography>
                    </Box>
                    <Button
                        onClick={GetOTP}
                        disabled={!Agree}
                        disableElevation
                        variant="contained"
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#085e15",
                            fontWeight: "700",
                            borderRadius: "5px",
                            fontSize: "24px !important",
                            textTransform: "none",
                            height: "50px",
                        }}
                        fullWidth
                    >
                        Register
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
            <Dialog open={Dial}>
                <Box sx={{ p: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography sx={{ mb: 1 }}>Enter OTP here</Typography>
                    <OTPInput
                        value={otp}
                        onChange={(e) => setOtp(e)}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        inputStyle={{
                            border: "1px solid #085e15",
                            borderRadius: "8px",
                            width: "54px",
                            height: "54px",
                            fontSize: "12px",
                            color: "#000",
                            fontWeight: "400",
                            caretColor: "blue"
                        }}
                        focusStyle={{
                            border: "1px solid #085e15",
                            outline: "none"
                        }}
                    />
                    {WrongOTP ? <p style={{ fontSize: "12px", color: "red", marginTop: "10px" }}>Wrong OTP !</p> : ""}
                    <Box sx={{ display: "flex", justifyContent: 'end' }}>

                        <Button onClick={() => setDial(false)} style={{
                            marginTop: "10px",
                            // backgroundColor: "#085e15",
                            border: "1px solid #085e15",
                            color: "#085e15",
                            fontWeight: "700",
                            borderRadius: "5px",
                            marginRight: "10px",
                            fontSize: "24px !important",
                            textTransform: "none",
                        }}
                        >Cancel</Button>
                        <Button onClick={onSubmit} style={{
                            marginTop: "10px",
                            backgroundColor: "#085e15",
                            color: "#FFF",
                            fontWeight: "700",
                            borderRadius: "5px",
                            fontSize: "24px !important",
                            textTransform: "none",
                        }}
                        >Submit</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}

export default SignUp;
