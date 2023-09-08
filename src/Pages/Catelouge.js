import { Autocomplete, Button, Dialog, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import save from '../Assets/Images/Completed successfully.png'
import moment from "moment/moment";
import { BASE_URL } from '../Config/Config';
import { LoadingButton } from '@mui/lab';
import FreeSoloCreateOptionDialog from '../Component/Autocomplete/AddAutocomplete';
import FashionForm from '../Component/forms/FashionForm'
function Catelouge() {
    const Category = ["Men Fashion", "Women Fashion"]
    const SubCategory = {
        "Men Fashion": ["Shirt", "Pant", "Chain", "Ring", "Shorts", "T-Shirt"],
        "Women Fashion": ["Chudi", "Top", "Neckless", "Ring", "Chain", "T-Shirt"]
    }
    const params = useParams()
    const [CategoryState, setCategoryState] = useState("");
    const [load, setLoad] = useState(false);

    const nav = useNavigate()
    const [taskname, setTaskName] = useState("");


    const [dial, setDial] = useState(false);
    const [errObj, setErrObj] = useState({
        date: false,
        type: false,
        projectname: false,
        taskname: false,
        starttime: false,
        endtime: false,
    });

    const TaskData = () => {
        console.log("dd")
    }


    //Create Function 
    const CreateData = () => {
        setLoad(true)

    }


    // Update Function 
    const UpdateData = () => {
        console.log("Loged")
    }

    useEffect(() => {

    }, [])
    return (
        <Box
            sx={{
                backgroundColor: "#FFF",
                p: "20px ",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
            }}
        >
            <Typography component="h6">
                Add New Catelouge
            </Typography>
            <Divider sx={{ mt: "10px" }} />
            <Box>
                <Grid container spacing={2} justifyContent="center" sx={{ my: "10px" }}>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Select Category
                        </InputLabel>
                        <Autocomplete
                            disablePortal
                            options={Category}
                            renderInput={(params) => <TextField {...params} size='small' placeholder='Category' fullWidth />}
                            onChange={(e, value) => setCategoryState(value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Select Sub Category
                        </InputLabel>
                        <Autocomplete
                            disablePortal
                            options={CategoryState == null ? [] : SubCategory[CategoryState]}
                            renderInput={(params) => <TextField {...params} size='small' placeholder='Category' fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FashionForm />
                    </Grid>
                </Grid>
            </Box>
            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                {params.action == "view" ? (
                    <Link to="/timesheet" style={{ textDecoration: "none" }}>
                        {" "}
                        <Button
                            disableElevation
                            size="small"
                            variant="outlined"
                            sx={{
                                border: "1px solid #2B3588",
                                color: "#2B3588",
                                fontSize: "14px !important",
                                py: "3px",
                                px: "15px",
                                textTransform: "none",
                                "&:hover": { color: "#2B3588", border: "1px solid #2B3588" },
                            }}
                        >
                            Cancel
                        </Button>
                    </Link>
                ) : params.action == "edit" ? (
                    <>
                        <Link to="/timesheet" style={{ textDecoration: "none" }}>
                            {" "}
                            <Button
                                disableElevation
                                size="small"
                                variant="outlined"
                                sx={{
                                    border: "1px solid #2B3588",
                                    color: "#2B3588",
                                    fontSize: "14px !important",
                                    py: "3px",
                                    px: "15px",
                                    textTransform: "none",
                                    "&:hover": { color: "#2B3588", border: "1px solid #2B3588" },
                                }}
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            disableElevation
                            size="small"
                            variant="contained"
                            sx={{
                                ml: "20px",
                                backgroundColor: "#2B3588",
                                borderRadius: "3px",
                                textTransform: "none",
                                px: "10px",
                                py: "0",
                                "&:hover": { backgroundColor: "#2B3588" },
                            }}
                            onClick={() => {
                                UpdateData();
                            }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/timesheet" style={{ textDecoration: "none" }}>
                            {" "}
                            <Button
                                disableElevation
                                size="small"
                                variant="outlined"
                                sx={{
                                    border: "1px solid #2B3588",
                                    color: "#2B3588",
                                    fontSize: "14px !important",
                                    py: "3px",
                                    px: "15px",
                                    textTransform: "none",
                                    "&:hover": { color: "#2B3588", border: "1px solid #2B3588" },
                                }}
                            >
                                Cancel
                            </Button>
                        </Link>
                        <LoadingButton
                            disableElevation
                            size="small"
                            loading={load}
                            variant="contained"
                            sx={{
                                ml: "20px",
                                backgroundColor: "#2B3588",
                                borderRadius: "3px",
                                textTransform: "none",
                                px: "10px",
                                py: "0",
                                "&:hover": { backgroundColor: "#2B3588" },
                            }}
                            onClick={() => {
                                CreateData();
                            }}
                        >
                            Save
                        </LoadingButton>
                    </>
                )}
                <Dialog open={dial} fullWidth>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <img src={save}></img>
                    </Box>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                            textAlign: "center",
                            fontWeight: "500",
                            my: "20px",
                            lineHeight: "29px",
                        }}
                    >
                        Time Sheet added successfully
                    </Typography>
                    <Box sx={{ textAlign: "center", p: "20px" }}>
                        <Button
                            disableElevation
                            style={{
                                backgroundColor: "#2B3588",
                                textDecoration: "none",
                                textTransform: "none",
                                borderRadius: "3px",
                            }}
                            variant="contained"
                            onClick={() => nav("/timesheet", { replace: true })}
                        >
                            {" "}
                            Ok
                        </Button>
                    </Box>
                </Dialog>
            </Stack>
        </Box>
    );
}

export default Catelouge;