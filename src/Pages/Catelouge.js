import { Autocomplete, Button, Dialog, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import save from '../Assets/Images/Completed successfully.png'
import { BASE_URL } from '../Config/Config';
import { LoadingButton } from '@mui/lab';
import SingleFileUpoload from '../Component/fileupload/SingleFileUpload'
import MultiFileUpoload from '../Component/fileupload/MultiFileUpoload'

function Catelouge() {

    const [Category, setCategory] = useState("");
    const [CategoryID, setCategoryID] = useState("");
    const [Name, setName] = useState("");
    const [Stock, setStock] = useState("");
    const [MarketPrice, setMarketPrice] = useState("");
    const [Price, setPrice] = useState("");
    const [Discription, setDiscription] = useState("");
    const [NetQuantity, setNetQuantity] = useState("");
    const [ImageURL, setImageURL] = useState([]);

    const [errObj, setErrObj] = useState({
        Category: false,
        Name: false,
        Stock: false,
        MatketPrice: false,
        Price: false,
        Discription: false,
        NetQuantity: false,
        ImageUrl: false,
    });
    const [disable, setDisable] = useState(false);

    const params = useParams()
    const [ListAllCategory, setListAllCategory] = useState([]);
    const [ListAllSubCategory, setListAllSubCategory] = useState([]);


    const [load, setLoad] = useState(false);

    const location = useLocation()
    const nav = useNavigate()



    const [dial, setDial] = useState(false);

    const handleCategoryChange = (e, value) => {
        if (value != null) {
            setCategory(value.Category)
            setCategoryID(value._id)
            setName("")
            BASE_URL.post('/subcategory/listbyid', { CategoryID: value._id }).then(res => {
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
            Category: CategoryID,
            Name,
            MarketPrice: Number(MarketPrice),
            YourPrice: Number(Price),
            Stock: Number(Stock),
            Discription,
            CreatedDate: new Date().toLocaleDateString(),
            NetQuantity: Number(NetQuantity),
            ImageURL,
            CreatedBy: localStorage.getItem("userid"),
        }
        setLoad(true)
        let err = {
            Category: Category.trim() == "",
            Name: Name.trim() == "",
            Stock: Stock.trim() == "",
            MarketPrice: MarketPrice.trim() == "",
            Price: Price.trim() == "",
            Discription: Discription.trim() == "",
            NetQuantity: NetQuantity.trim() == "",
            ImageUrl: ImageURL.length == 0,
        }
        setErrObj(err)
        if (Object.values(err).some(val => val == true)) {
            setLoad(false)
        } else {
            BASE_URL.post("/product/create", data).then(res => {
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
            _id: params.id,
            Category: CategoryID,
            Name,
            MarketPrice: Number(MarketPrice),
            YourPrice: Number(Price),
            Stock: Number(Stock),
            Discription,
            UpdatedDate: new Date().toLocaleDateString(),
            NetQuantity: Number(NetQuantity),
            ImageURL,
        }
        setLoad(true)
        let err = {

            Category: CategoryID == "",
            Name: Name.trim() == "",
            Stock: Stock == "",
            MarketPrice: MarketPrice == "",
            Price: Price == "",
            Discription: Discription.trim() == "",
            NetQuantity: NetQuantity == "",
            ImageUrl: ImageURL.length == 0,
        }
        setErrObj(err)
        if (Object.values(err).some(val => val == true)) {
            setLoad(false)
        } else {
            BASE_URL.post("/product/update", data).then(res => {
                if (res.data.Status) {
                    setLoad(false)
                    nav('/product')
                }
            })
        }
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
    const ListById = () => {
        const ProductID = params.id
        BASE_URL.put("/product/listbyid", { ProductID }).then(res => {
            if (res.data.Status) {
                setStock(res.data.Message[0].Stock ? res.data.Message[0].Stock : "")
                setCategory(res.data.Message[0].category.Category ? res.data.Message[0].category.Category : "")
                setCategoryID(res.data.Message[0].Category ? res.data.Message[0].Category : "")
                setName(res.data.Message[0].Name ? res.data.Message[0].Name : "")
                setMarketPrice(res.data.Message[0].MarketPrice ? res.data.Message[0].MarketPrice : "")
                setPrice(res.data.Message[0].YourPrice ? res.data.Message[0].YourPrice : "")
                setDiscription(res.data.Message[0].Discription ? res.data.Message[0].Discription : "")
                setNetQuantity(res.data.Message[0].NetQuantity ? res.data.Message[0].NetQuantity : "")
                setImageURL(res.data.Message[0].ImageURL ? res.data.Message[0].ImageURL : "")
            }
        })
    }

    useEffect(() => {
        ListCategory()
        if (params.action == "view") {
            setDisable(true)
            ListById()
        } else if (params.action == "edit") {
            ListById()
        } else {
            setCategory("")
            setName("")
            setStock("")
            setMarketPrice("")
            setPrice("")
            setDiscription("")
            setNetQuantity("")
            setImageURL([])
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
                            disabled={disable}
                            options={ListAllCategory}
                            value={{ Category }}
                            getOptionLabel={(option) => option.Category}
                            renderInput={(params) => <TextField {...params} error={errObj["Category"]} helperText={errObj["Category"] ? "Catgory is required" : ""} size='small' placeholder='Category' fullWidth />}
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
                            disabled={disable}
                            value={{ Name }}
                            options={ListAllSubCategory}
                            getOptionLabel={(option) => option.Name}
                            renderInput={(params) => <TextField {...params} size='small' error={errObj["Name"]} helperText={errObj["Name"] ? "Name is required" : ""} placeholder={`Select ${Category}`} fullWidth />}
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
                                helperText={errObj["Stock"] ? "Stocks is required" : ""}
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
                                helperText={errObj["Stock"] ? "Stocks is required" : ""}
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
                            helperText={errObj["MarketPrice"] ? "Market Price is required" : ""}
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
                            Our Price ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={Price}
                            onChange={(e) => setPrice(e.target.value)}
                            size="small"
                            error={errObj["Price"]}
                            helperText={errObj["Price"] ? "Price is required" : ""}
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
                            GST ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={true}
                            value={Price ? ((Price * 5) / 100) : ""}
                            size="small"
                            placeholder='5%'
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
                            helperText={errObj["Discription"] ? "Discription is required" : ""}
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
                            Net Quantity (minimum 300 g)
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={NetQuantity}
                            onChange={(e) => setNetQuantity(e.target.value)}
                            size="small"
                            error={errObj["NetQuantity"]}
                            helperText={errObj["NetQuantity"] ? "Net Quantity is required" : ""}
                            placeholder="300"
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
                        <MultiFileUpoload disable={disable} ImageURL={ImageURL} ErrorObj={errObj} setImageURL={setImageURL} />
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