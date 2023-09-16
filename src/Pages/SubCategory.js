import { Box, Button, Grid, IconButton, Pagination, Tooltip, Typography } from '@mui/material'
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




function SubCategory() {
    const [SubCategory, setSubCategory] = useState([]);

    const ListSubCategory = () => {
        BASE_URL.post("/subcategory/list").then((res) => {
            if (res.data.Status) {
                setSubCategory([...res.data.Message]);
            }
        });
    };
    const Delete = (id) => {
        BASE_URL.post("/subcategory/delete", { SubCategoryID: id }).then((res) => {
            let x = res.data.Status ? ListSubCategory() : "";
        });
    };
    useEffect(() => {
        ListSubCategory();
    }, []);

    const columns = [
        // {
        //     field: "Category",
        //     headerName: "Category",
        //     width: 300,
        //     sortable: false,
        // },
        {
            field: "Name",
            headerName: "Name",
            flex: 1,
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
                            <Link to={`/subcategory/view/${params.row._id}`}><VisibilityIcon sx={{ color: '#5f49d3' }} /></Link>
                        </Tooltip>
                    </IconButton>
                    <IconButton>
                        <Tooltip title="Edit" arrow>
                            <Link to={`/subcategory/edit/${params.row._id}`}><BorderColorIcon sx={{ color: '#5f49d3' }} /></Link>
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
                            <Link to='/subcategory/create'><Button disableFocusRipple disableElevation sx={{ backgroundColor: "#085e15", color: "#FFF", ":hover": { backgroundColor: "#085e15", color: "#FFF" } }}>Add Sub Category</Button></Link>
                        </Box>
                    </Box>
                    <MyDataGrid columns={columns} rows={SubCategory} id="_id" />
                </Box>
            </Grid>
        </Grid>
    )
}

export default SubCategory
