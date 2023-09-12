import { Autocomplete, Button, Dialog, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import save from '../Assets/Images/Completed successfully.png'
import { BASE_URL } from '../Config/Config';
import { LoadingButton } from '@mui/lab';

function Catelouge() {


    const [Stock, setStock] = useState("");
    const [MarketPrice, setMarketPrice] = useState("");
    const [Price, setPrice] = useState("");
    const [Discription, setDiscription] = useState("");
    const [NetQuantity, setNetQuantity] = useState("");

    const [errObj, setErrObj] = useState({
        Stock: false,
        MatketPrice: false,
        Price: false,
        Discription: false,
        NetQuantity: false,
    });
    const [disable, setDisable] = useState(false);

    const params = useParams()
    const [ListAllCategory, setListAllCategory] = useState([]);
    const [ListAllSubCategory, setListAllSubCategory] = useState([]);

    const [Category, setCategory] = useState("");

    const [Name, setName] = useState("");

    const [load, setLoad] = useState(false);

    const nav = useNavigate()



    const [dial, setDial] = useState(false);

    const handleCategoryChange = (e, value) => {
        if (value != null) {
            setCategory(value.Category)
            setName("")
            BASE_URL.post('/subcategory/listbyid', { CategoryID: value._id }).then(res => {
                console.log(res.data)
                if (res.data.Status) {
                    setListAllSubCategory([...res.data.Message])
                } else {

                }
            })
        } else {
            setCategory("")
            setListAllSubCategory([])
            setName("")
        }

    }


    //SubCategory Function 
    const handleSubCategoryChange = (e, value) => {
        if (value != null) {
            setName(value.Name)
        } else {
            setName("")
        }

    }
    //Create Function 
    const CreateData = () => {
        const data = {
            Category,
            Name,
            MarketPrice,
            YourPrice: Price,
            Stock,
            Discription,
            CreatedDate: new Date().toLocaleDateString(),
            NetQuantity,
            ImageURL: ["https://t3.ftcdn.net/jpg/04/07/93/00/240_F_407930079_cUaIKu2X9rTstokJ1ohsIgkYsimvZnp1.jpg"],
            CreatedBy: "6500209802024c7f6b665751",
        }
        console.log(data)
        setLoad(true)
        BASE_URL.post("/product/create", data).then(res => {
            if (res.data.Status) {
                setLoad(false)
                nav('/product')
            }
        })

    }



    // Update Function 
    const UpdateData = () => {
        console.log("Loged")
    }


    //List Category Function 
    const ListCategory = () => {
        BASE_URL.put('/category/list').then(res => {
            if (res.data.Status) {
                setListAllCategory([...res.data.Message])
            } else {

            }
        })

    }

    useEffect(() => {
        ListCategory()
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
                                color: "#085e15",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Select Category
                        </InputLabel>
                        <Autocomplete
                            disablePortal
                            options={ListAllCategory}
                            value={{ Category }}
                            getOptionLabel={(option) => option.Category}
                            renderInput={(params) => <TextField {...params} size='small' placeholder='Category' fullWidth />}
                            onChange={(e, value) => handleCategoryChange(e, value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#085e15",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Select {Category}
                        </InputLabel>
                        <Autocomplete
                            disablePortal
                            value={{ Name }}
                            options={ListAllSubCategory}
                            getOptionLabel={(option) => option.Name}
                            renderInput={(params) => <TextField {...params} size='small' placeholder={`Select ${Category}`} fullWidth />}
                            onChange={(e, value) => handleSubCategoryChange(e, value)}
                        />
                    </Grid>

                    {
                        Category == "Egg" ? (<Grid item xs={12} md={6}>
                            <InputLabel
                                sx={{
                                    color: "#5E6366",
                                    fontSize: "14px !important",
                                    mb: "8px",
                                }}
                            >
                                Available Stock (Count)
                            </InputLabel>
                            <TextField
                                disabled={disable}
                                value={Stock}
                                onChange={(e) => setStock(e.target.value)}
                                size="small"
                                error={errObj["Stock"]}
                                helperText={errObj["Stock"] ? "Task Name is required" : ""}
                                placeholder="14"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>) : (<Grid item xs={12} md={6}>
                            <InputLabel
                                sx={{
                                    color: "#5E6366",
                                    fontSize: "14px !important",
                                    mb: "8px",
                                }}
                            >
                                Available Stock (kg)
                            </InputLabel>
                            <TextField
                                disabled={disable}
                                value={Stock}
                                onChange={(e) => setStock(e.target.value)}
                                size="small"
                                error={errObj["Stock"]}
                                helperText={errObj["Stock"] ? "Task Name is required" : ""}
                                placeholder="14"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>)
                    }
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Market Price ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={MarketPrice}
                            onChange={(e) => setMarketPrice(e.target.value)}
                            size="small"
                            error={errObj["MarketPrice"]}
                            helperText={errObj["MarketPrice"] ? "Task Name is required" : ""}
                            placeholder="699"
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
                            Your Price ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={Price}
                            onChange={(e) => setPrice(e.target.value)}
                            size="small"
                            error={errObj["Price"]}
                            helperText={errObj["Price"] ? "Task Name is required" : ""}
                            placeholder="399"
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
                            Our Commission ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={true}
                            value={Price ? ((Price * 10) / 100) : ""}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="399"
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
                            Discription
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={Discription}
                            onChange={(e) => setDiscription(e.target.value)}
                            size="small"
                            error={errObj["Discription"]}
                            helperText={errObj["Discription"] ? "Task Name is required" : ""}
                            placeholder="Discription"
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
                            Net Quantity (minimum)
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={NetQuantity}
                            onChange={(e) => setNetQuantity(e.target.value)}
                            size="small"
                            error={errObj["NetQuantity"]}
                            helperText={errObj["NetQuantity"] ? "Task Name is required" : ""}
                            placeholder="1"
                            variant="outlined"
                            fullWidth
                        />
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
                        <Link to="/timesheet" style={{ textDecoration: "none" }}>
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
                        <Link to="/timesheet" style={{ textDecoration: "none" }}>
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
                                backgroundColor: "#085e15",
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