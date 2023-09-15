import { Autocomplete, Button, Dialog, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../Config/Config';
import { LoadingButton } from '@mui/lab';
import SingleFileUpoload from '../fileupload/SingleFileUpload';

function AddCategory() {
    const [CatgoryName, setCatgoryName] = useState("");
    const [SubCatgoryName, setSubCatgoryName] = useState("");
    const [ImageURL, setImageURL] = useState("");

    const [errObj, setErrObj] = useState({
        CatgoryName: false,
        SubCatgoryName: false,
        ImageURL: false,
    });
    const [disable, setDisable] = useState(false);

    const params = useParams()


    const [load, setLoad] = useState(false);

    const location = useLocation()
    const nav = useNavigate()

    //Create Function 
    const CreateData = () => {
        const data = {
            CatgoryName,
            SubCatgoryName,
            ImageURL,
        }
        setLoad(true)
        let err = {
            CatgoryName: CatgoryName.trim() == "",
            SubCatgoryName: SubCatgoryName.trim() == "",
            ImageURL: ImageURL.trim == "",
        }
        setErrObj(err)
        if (Object.values(err).some(val => val == true)) {
            setLoad(false)
        } else {
            BASE_URL.post("/category/create", data).then(res => {
                if (res.data.Status) {
                    setLoad(false)
                    nav('/product')
                }
            })
        }

    }



    // Update Function 
    const UpdateData = () => {
        const data = {
            CatgoryName,
            SubCatgoryName,
            ImageURL,
        }
        setLoad(true)
        let err = {
            CatgoryName: CatgoryName.trim() == "",
            SubCatgoryName: SubCatgoryName.trim() == "",
            ImageURL: ImageURL.trim == "",
        }
        setErrObj(err)
        if (Object.values(err).some(val => val == true)) {
            setLoad(false)
        } else {
            BASE_URL.post("/category/update", data).then(res => {
                if (res.data.Status) {
                    setLoad(false)
                    nav('/product')
                }
            })
        }
    }


    const ListById = () => {
        const ProductID = params.id
        BASE_URL.put("/product/listbyid", { ProductID }).then(res => {
            if (res.data.Status) {
                setCatgoryName(res.data.Message[0].Category ? res.data.Message[0].Category : "")
                setSubCatgoryName(res.data.Message[0].SubCategory ? res.data.Message[0].SubCategory : "")
                setImageURL(res.data.Message[0].ImageURL ? res.data.Message[0].ImageURL : "")
            }
        })
    }

    // useEffect(() => {
    //     ListCategory()
    //     if (params.action == "view") {
    //         setDisable(true)
    //         ListById()
    //     } else if (params.action == "edit") {
    //         ListById()
    //     } else {
    //         setCatgoryName("")
    //         setsubCatgoryName("")
    //         setImageURL("")
    //     }
    // }, [location.pathname])
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
                            Category Name
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={CatgoryName}
                            onChange={(e) => setCatgoryName(e.target.value)}
                            size="small"
                            error={errObj["CatgoryName"]}
                            helperText={errObj["CatgoryName"] ? "CatgoryName is required" : ""}
                            placeholder="Vegitables"
                            variant="outlined"
                            fullWidth
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
                            Sub Catgory Name
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={SubCatgoryName}
                            onChange={(e) => setSubCatgoryName(e.target.value)}
                            size="small"
                            error={errObj["SubCatgoryName"]}
                            helperText={errObj["SubCatgoryName"] ? "Sub Catgory Name is required" : ""}
                            placeholder="Tomato"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Upload Photo
                        </InputLabel>
                        <SingleFileUpoload disable={disable} setImageURL={setImageURL} ErrorObj={errObj} />
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
                    <Link to="/product" style={{ textDecoration: "none" }}>
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
                ) : params.action == "edit" ? (
                    <>
                        <Link to="/product" style={{ textDecoration: "none" }}>
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
                        <Button
                            disableElevation
                            size="small"
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
                                UpdateData();
                            }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/" style={{ textDecoration: "none" }}>
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
                    </>
                )}
            </Stack>
        </Box>
    );
}

export default AddCategory;