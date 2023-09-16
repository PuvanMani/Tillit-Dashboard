import { Autocomplete, Button, Dialog, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../Config/Config';
import { LoadingButton } from '@mui/lab';
import SingleFileUpoload from '../fileupload/SingleFileUpload';

function AddCategory() {
    const [Category, setCategory] = useState("");
    const [ImageURL, setImageURL] = useState("");
    const [ImageName, setImageName] = useState("");

    const [errObj, setErrObj] = useState({
        Category: false,
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
            Category,
            ImageURL,
            ImageName
        }
        setLoad(true)
        let err = {
            Category: Category.trim() == "",
            ImageURL: ImageURL.trim == "",
        }
        setErrObj(err)
        if (Object.values(err).some(val => val == true)) {
            setLoad(false)
        } else {
            BASE_URL.post("/category/create", data).then(res => {
                if (res.data.Status) {
                    setLoad(false)
                    nav('/category')
                }
            })
        }

    }



    // Update Function 
    const UpdateData = () => {
        const data = {
            _id: params.id,
            Category,
            ImageURL,
            ImageName
        }
        setLoad(true)
        let err = {
            Category: Category.trim() == "",
            ImageURL: ImageURL.trim == "",
        }
        setErrObj(err)
        if (Object.values(err).some(val => val == true)) {
            setLoad(false)
        } else {
            BASE_URL.post("/category/update", data).then(res => {
                if (res.data.Status) {
                    setLoad(false)
                    nav('/category')
                }
            })
        }
    }


    const ListById = () => {
        const CategoryID = params.id
        BASE_URL.put("/category/listbyid", { CategoryID }).then(res => {
            if (res.data.Status) {
                setCategory(res.data.Message[0].Category ? res.data.Message[0].Category : "")
                setImageURL(res.data.Message[0].ImageURL ? res.data.Message[0].ImageURL : "")
                setImageName(res.data.Message[0].ImageName ? res.data.Message[0].ImageName : "")
            }
        })
    }

    useEffect(() => {
        // ListCategory()
        if (params.action == "view") {
            setDisable(true)
            ListById()
        } else if (params.action == "edit") {
            ListById()
        } else {
            setCategory("")
            setImageURL("")
        }
    }, [location.pathname])
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
                            Category Name
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={Category}
                            onChange={(e) => setCategory(e.target.value)}
                            size="small"
                            error={errObj["Category"]}
                            helperText={errObj["Category"] ? "Category is required" : ""}
                            placeholder="Vegitables"
                            variant="outlined"
                            fullWidth
                        />
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
                        <SingleFileUpoload disable={disable} setImageURL={setImageURL} ImageName={ImageName} setImageName={setImageName} ErrorObj={errObj} />
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
                    <Link to="/category" style={{ textDecoration: "none" }}>
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
                        <Link to="/category" style={{ textDecoration: "none" }}>
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
                        <Link to="/category" style={{ textDecoration: "none" }}>
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