import { Box, Grid, IconButton, Pagination, Tooltip, Typography } from '@mui/material'
import React from 'react'
import ProductCard from '../Component/Card/ProductCartd'
import MyDataGrid from '../Component/datagrid/datagrid'
import { Link } from 'react-router-dom';
import { Sweetalert } from '../Component/sweetalert/sweetalert';
import moment from 'moment';
import { useEffect } from 'react';
import { BASE_URL } from '../Config/Config';
import { useState } from 'react';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
function Product() {
    const [ProductList, setProductList] = useState([]);
    const [listData, setlistData] = useState([]);

    const todosPerPage = 4;

    const changepage = (e, page) => {
        let listdata = ProductList.slice((page - 1) * todosPerPage, (page - 1) * todosPerPage + todosPerPage);
        setlistData(listdata)
    }

    const ListTask = () => {
        BASE_URL.post("/product/list").then((res) => {
            if (res.data.Status) {
                setProductList([...res.data.Message]);
            }
        });
    };
    const Delete = (id) => {
        BASE_URL.post("/product/delete", { ProductID: id }).then((res) => {
            let x = res.data.Status ? ListTask() : "";
        });
    };
    useEffect(() => {
        ListTask();
        let listdata = ProductList.slice((1 - 1) * todosPerPage, (1 - 1) * todosPerPage + todosPerPage);
        setlistData(listdata)
    }, []);

    const columns = [
        {
            field: "Name",
            headerName: "Name",
            width: 300,
            sortable: false,
        },
        {
            field: "Stock",
            headerName: "Stocks",
            width: 110,
            sortable: false,
        },
        {
            field: "MarketPrice",
            headerName: "Market Price",
            width: 150,
            sortable: false,
            valueGetter: (params) => `₹ ${params?.value}`,
        },
        {
            field: "YourPrice",
            headerName: "Your Price",
            headerAlign: "left",
            filter: false,
            align: "left",
            width: 110,
            sortable: false,
            valueGetter: (params) => `₹ ${params?.value}`
        },
        {
            field: "Discription",
            headerName: "Discription",
            headerAlign: "left",
            filter: false,
            align: "left",
            width: 200,
            sortable: false,
        },
        {
            field: "NetQuantity",
            headerName: "Net Quantity",
            headerAlign: "left",
            filter: false,
            align: "left",
            width: 150,
            sortable: false,
        },
        {
            field: "Action",
            headerName: "Action",
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton>
                        <Tooltip title="View" arrow>
                            <Link to={`/catelouge/view/${params.row._id}`}><VisibilityIcon sx={{ color: '#5f49d3' }} /></Link>
                        </Tooltip>
                    </IconButton>
                    <IconButton>
                        <Tooltip title="Edit" arrow>
                            <Link to={`/catelouge/edit/${params.row._id}`}><BorderColorIcon sx={{ color: '#5f49d3' }} /></Link>
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            Sweetalert("Are you sure?").then((res) =>
                                res ? Delete(params.row._id) : ""
                            )
                        }
                    >
                        <Tooltip title="Delete" arrow>
                            <Link>
                                <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
                            </Link>
                        </Tooltip>
                    </IconButton>
                </>
            ),
        },
    ];


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box
                    sx={{
                        background: "white",
                        width: "100%",
                        backgroundColor: "#FFF",
                        boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "10px",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: "#FFF",
                            px: "20px",
                            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)",
                            borderTopRightRadius: "10px",
                            borderTopLeftRadius: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                pt: "10px",
                                pb: "10px",
                                marginBottom: "2.5px",
                            }}
                        >
                            <Typography
                                component="h6"
                                style={{ fontSize: "16px", lineHeight: "29px", fontWeight: "500" }}
                            >
                                Success Delivery
                            </Typography>
                        </Box>
                    </Box>
                    <MyDataGrid columns={columns} rows={ProductList} id="_id" />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        ProductList.map(val => (
                            <Grid item xs={12} sm={4} md={3}><ProductCard key={val.title} data={val} /></Grid>
                        ))
                    }
                </Grid>
                {(ProductList.length / 4) > 1 ? <Pagination count={Math.round(ProductList.length / 4)} onChange={(e, page) => changepage(e, page)} sx={{ my: "10px" }} /> : ""}
            </Grid>
        </Grid>
    )
}

export default Product
