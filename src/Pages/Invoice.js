import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
// import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';
import { DeleteOutlineOutlined, VisibilityOutlined, EditOutlined, PrintOutlined } from '@mui/icons-material'
import { BASE_URL } from '../Config/Config';
// import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';
import moment from 'moment';
import Swal from 'sweetalert2';
import MyDataGrid from '../Component/datagrid/datagrid';

export default function InvoiceTable() {

    const [rows, setRows] = useState([]);

    const ListInvoice = () => {
        BASE_URL.get('invoice/list').then((res) => {
            // if(res.data.result.length<1){
            //     Swal.fire({
            //         title:"Oops!",
            //         text:"There is no relevant Data",
            //         timer:2000,
            //         icon:"info",
            //         showConfirmButton:false
            //     })
            // }
            setRows([...res.data.result]);
            console.log(res.data)
        });
    };

    const handleRowDelete = (InvoiceID) => {
        Swal.fire({
            title: "Are you Sure ?",
            text: "You want to delete it?",
            icon: "warning",
            confirmButtonText: "Yes Delete it",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                BASE_URL.post(`invoice/delete`, { InvoiceID: InvoiceID }).then((res) => {
                    if (res.data.status === true) {
                        ListInvoice()
                    }
                })
                Swal.fire({
                    title: "Deleted",
                    text: "The data deleted successfully",
                    icon: "success"
                })
            }
            else if (result.dismiss) {
                Swal.fire({
                    title: "Cancelled",
                    text: "The data is not deleted",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    };

    const columns = [
        {
            field: "StudentName",
            headerName: "Student Name",
            width: 160,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false
        },
        {
            field: "CourseName",
            headerName: "Course Name",
            width: 200,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false
        },
        {
            field: "PendingAmount",
            headerName: "Pending Amount",
            width: 160,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false
        },
        {
            field: "Term",
            headerName: "PayingTerm",
            width: 130,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false
        },
        {
            field: "TermFees",
            headerName: "Term Fee",
            width: 100,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false
        },
        {
            field: "Discount",
            headerName: "Discount",
            width: 130,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false,
            valueFormatter: (params) => {
                if (params.value === "") {
                    return 'N/A'
                }
                return `${params.value} %`
            }
        },
        {
            field: "TotalAmount",
            headerName: "Amount Paid",
            width: 130,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false
        },
        {
            field: "PaymentMethod",
            headerName: "Payment Method",
            width: 160,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false
        },
        {
            field: "InvoiceGenDate",
            headerName: "Date",
            width: 120,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false,
            valueGetter: (params) => moment(params.value).format("YYYY-MM-DD")
        },
        {
            field: "none",
            headerName: "Action",
            width: 150,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Link to={`/invoices/generate/${params.row.InvoiceID}`}> <IconButton disableRipple sx={{ p: 0, color: "#FDB750" }}><PrintOutlined /></IconButton></Link>
                        <Link to={`/invoices/forms/update/${params.row.InvoiceID}`}> <IconButton disableRipple sx={{ p: 0, color: "#2EFF2E" }}><EditOutlined /></IconButton></Link>
                        <Link to={`/invoices/forms/read/${params.row.InvoiceID}`}><IconButton disableRipple sx={{ p: 0, color: "#4daaff" }}><VisibilityOutlined /></IconButton></Link>
                        <IconButton disableRipple onClick={() => { handleRowDelete(params.row.InvoiceID) }} sx={{ p: 0, color: "red" }}><DeleteOutlineOutlined /></IconButton>
                    </Stack>
                )
            },
        }
    ];


    useEffect(() => {
        ListInvoice()
    }, []);


    return (
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
                        Invoice
                    </Typography>
                </Box>
            </Box>
            <MyDataGrid columns={columns} rows={rows} id='InvoiceID' />
        </Box>
    )
};
