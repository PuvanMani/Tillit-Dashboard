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
function Product() {
    const [TaskData, setTaskData] = useState([]);
    const [listData, setlistData] = useState([]);

    const todosPerPage = 4;

    useEffect(() => {
        let listdata = Productdata.slice((1 - 1) * todosPerPage, (1 - 1) * todosPerPage + todosPerPage);
        setlistData(listdata)
    }, [])
    const changepage = (e, page) => {
        let listdata = Productdata.slice((page - 1) * todosPerPage, (page - 1) * todosPerPage + todosPerPage);
        setlistData(listdata)
    }

    const ListTask = () => {
        BASE_URL.post("/timesheet/listall").then((res) => {
            setTaskData([...res.data.Message]);
        });
    };
    const Delete = (TaskID) => {
        BASE_URL.post("/timesheet/deletesheet", { TaskID }).then((res) => {
            let x = res.data.Status ? ListTask() : "";
        });
    };
    useEffect(() => {
        ListTask();
    }, []);

    const columns = [
        {
            headerAlign: "left",
            field: "TaskName",
            headerName: "Task Name",
            width: 250,
            sortable: false,
        },
        {
            field: "TaskDate",
            headerName: "Date",
            width: 150,
            sortable: false,
            valueGetter: (params) => moment(params?.value).format("DD-MM-YYYY"),
        },
        {
            field: "ProjectName",
            headerName: "Project/Product Name",
            width: 150,
            sortable: false,
        },
        {
            field: "StartTime",
            headerName: "Start Time",
            width: 150,
            sortable: false,
            valueGetter: (params) => moment(params?.value, "hh:mm").format("hh:mm A"),
        },
        {
            field: "EndTime",

            headerName: "End Time",
            headerAlign: "left",
            filter: false,
            align: "left",
            width: 110,
            sortable: false,
            valueGetter: (params) => moment(params?.value, "hh:mm").format("hh:mm A"),
        },
        {
            field: "Totalhoures",
            headerName: "Total Hours (HH:MM:SS)",
            headerAlign: "left",
            filter: false,
            align: "left",
            width: 150,
            sortable: false,
            valueGetter: (params) => params?.value.slice(0, 5),
        },
        {
            field: "Action",
            headerName: "Action",
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <>
                    {/* <IconButton>
            <Tooltip title="View" arrow>
              <Link to={`/timesheet/view/${params.row.TaskID}`}><VisibilityOutlinedIcon sx={{ color: '#5f49d3' }} /></Link>
            </Tooltip>
          </IconButton >
          <IconButton>
            <Tooltip title="Edit" arrow>
              <Link to={`/timesheet/edit/${params.row.TaskID}`}><ModeEditOutlineOutlinedIcon sx={{ color: '#5f49d3' }} /></Link>
            </Tooltip>
          </IconButton> */}
                    <IconButton
                        onClick={() =>
                            Sweetalert("Are you sure?").then((res) =>
                                res ? Delete(params.row.TaskID) : ""
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
    let Productdata = [
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 1,
            Image: "https://m.media-amazon.com/images/I/61Y0-xRvsPL._UY695_.jpg",
            Shop: "SM Mobiles",
            Rati: 3
        },
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 2,
            Image: "https://m.media-amazon.com/images/I/41DMQg722ES._AC_SR400,600_AGcontrast_.jpg",
            Shop: "Electronic",
            Rati: 5
        },
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 7,
            Image: "https://m.media-amazon.com/images/I/41E4AzqjmfL._SX300_SY300_QL70_FMwebp_.jpg",
            Shop: "Electronic",
            Rati: 1
        },
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 9,
            Image: "https://fdn2.gsmarena.com/vv/bigpic/realme-9-5g-speed-edition.jpg",
            Shop: "Electronic",
            Rati: 4
        },
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 22,
            Image: "https://fdn2.gsmarena.com/vv/bigpic/realme-9-5g-speed-edition.jpg",
            Shop: "Electronic",
            Rati: 2
        },
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 22,
            Image: "https://fdn2.gsmarena.com/vv/bigpic/realme-9-5g-speed-edition.jpg",
            Shop: "Electronic",
            Rati: 3.5
        },
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 22,
            Image: "https://fdn2.gsmarena.com/vv/bigpic/realme-9-5g-speed-edition.jpg",
            Shop: "Electronic",
            Rati: 5
        },
        {
            Title: "Realme 9 5G Speed Edition",
            OriginalPrice: 25000,
            OfferPrice: 19500,
            Stock: 22,
            Image: "https://fdn2.gsmarena.com/vv/bigpic/realme-9-5g-speed-edition.jpg",
            Shop: "Electronic",
            Rati: 5
        },
    ]


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
                    <MyDataGrid columns={columns} rows={TaskData} id="TaskID" />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        listData.map(val => (
                            <Grid item xs={12} sm={4} md={3}><ProductCard key={val.title} data={val} /></Grid>
                        ))
                    }
                    <Pagination count={Math.round(Productdata.length / 4)} onChange={(e, page) => changepage(e, page)} sx={{ my: "10px" }} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Product
