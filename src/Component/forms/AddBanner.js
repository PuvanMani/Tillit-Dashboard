import { Autocomplete, Button, Dialog, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../Config/Config';
import { LoadingButton } from '@mui/lab';
import SingleFileUpoload from '../fileupload/SingleFileUpload';
import MultiFileUpoload from '../fileupload/MultiFileUpoload';

function AddBanner() {
    const [MainBanner, setMainBanner] = useState("");
    const [MiniBanner, setMiniBanner] = useState([]);
    const [ImageName, setImageName] = useState([]);

    const [errObj, setErrObj] = useState({
        MainBanner: false,
        MiniBanner: false,
    });
    const [disable, setDisable] = useState(false);

    const params = useParams()


    const [load, setLoad] = useState(false);

    const location = useLocation()
    const nav = useNavigate()

    //Create Function 
    const CreateData = () => {
        const data = {
            MainBanner,
            MiniBanner,
            ImageName
        }
        setLoad(true)
        let err = {
            MainBanner: MainBanner.trim() == "",
            MiniBanner: MiniBanner.trim == "",
        }
        setErrObj(err)
        if (Object.values(err).some(val => val == true)) {
            setLoad(false)
        } else {
            BASE_URL.post("/banner/create", data).then(res => {
                if (res.data.Status) {
                    setLoad(false)
                    nav('/')
                }
            })
        }

    }

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
                    <Grid item xs={12} sm={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            MainBanner Name
                        </InputLabel>

                        <SingleFileUpoload disable={disable} setImageURL={setMainBanner} ImageName={ImageName} setImageName={setImageName} ErrorObj={errObj} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Upload Photo
                        </InputLabel>
                        <MultiFileUpoload ImageURL={MiniBanner} setImageURL={setMiniBanner} ErrorObj={errObj} disable={disable} />
                    </Grid>
                </Grid>
            </Box>
            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>

                <Link to="/MainBanner" style={{ textDecoration: "none" }}>
                    {" "}
                    <Button
                        disableElevation
                        size="small"
                        variant="outlined"
                        sx={{
                            border: "1px solid #085e15",
                            color: "#085e15",
                            fontSize: "14px !important",
                            py: "3px",
                            px: "15px",
                            textTransform: "none",
                            "&:hover": { color: "#085e15", border: "1px solid #085e15" },
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
                        backgroundColor: "#085e15",
                        borderRadius: "3px",
                        textTransform: "none",
                        px: "10px",
                        py: "0",
                        "&:hover": { backgroundColor: "#085e15" },
                    }}
                    onClick={() => {
                        CreateData();
                    }}
                >
                    Save
                </LoadingButton>
            </Stack>
        </Box>
    );
}

export default AddBanner;