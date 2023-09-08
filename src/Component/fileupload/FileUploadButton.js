import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import { TextField, Button, Grid, IconButton } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { BASE_URL } from "../../Config/Config";
export default function SingleFileUpoloadButton({ Documents, setDocuments, Key, placeholder, ErrorObj }) {

    const fileInputRef = useRef(null);

    // function fileToBinaryArray(file) {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             const arrayBuffer = reader.result;
    //             const binaryArray = new Uint8Array(arrayBuffer);
    //             resolve(Object.values(binaryArray));
    //         };
    //         reader.onerror = () => {
    //             reject(reader.error);
    //         };
    //         reader.readAsArrayBuffer(file);
    //     });
    // }
    const handleFileInputChange = (event) => {
        return new Promise((resolve, reject) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result.split(",")[1];
                resolve(base64);
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSingleFileUpload = async (event) => {
        if (event.target.files) {
            if (Documents?.filter(val => val.ED_DocumentType == Key).length == 0) {
                let newObj = {
                    "PID": localStorage.getItem("PID"),
                    ED_DocumentType: Key,
                    ED_Document: await handleFileInputChange(event),
                    ED_DocumentName: event.target.files["0"].name ? event.target.files["0"].name : "",
                    ED_DocumentFormat: event.target.files["0"].type ? event.target.files["0"].type : ""
                }
                setDocuments([...Documents, newObj]);
            } else {
                let ind = Documents.findIndex(x => x.ED_DocumentType === Key)
                let newObj = {
                    "EmpDocID": Documents[ind].EmpDocID,
                    "PID": localStorage.getItem("PID"),
                    ED_DocumentType: Key,
                    ED_Document: await handleFileInputChange(event),
                    ED_DocumentName: event.target.files["0"].name ? event.target.files["0"].name : "",
                    ED_DocumentFormat: event.target.files["0"].type ? event.target.files["0"].type : ""
                }
                Documents[ind] = newObj
                setDocuments([...Documents]);
            }
        }
    };

    const handleTextFieldClick = () => {
        fileInputRef.current.click();
    };
    const handleDelete = () => {
        let Delete = Documents.filter(val => {
            if (val.ED_DocumentType == Key) {
                BASE_URL.post('/employeeinfo/deletedocumets', { EmpDocID: val.EmpDocID })
            } else {
                return true
            }
        })
        setDocuments([...Delete])
    }
    return (
        <Stack display='flex'>
            <Grid container columnSpacing={2}>
                <Grid item xs={9}>
                    <TextField
                        // disabled={disable}
                        value={Documents?.filter(val => val.ED_DocumentType == Key).map(val => val.ED_DocumentName)}
                        size="small"
                        error={ErrorObj[Key]}
                        helperText={ErrorObj[Key] ? `${Key} is required` : ""}
                        placeholder={placeholder}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            endAdornment: (Documents.some(val => ((val.ED_DocumentType == 'Passport' && Key == 'Passport') || (val.ED_DocumentType == 'DrivingLicense' && Key == 'DrivingLicense'))) && (Key == 'Passport' || Key == 'DrivingLicense')) ? <IconButton onClick={handleDelete}><ClearIcon sx={{ fontSize: "17px" }} /></IconButton> : ""
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button disableElevation size="small" variant="contained" sx={{ backgroundColor: "#2B3588", borderRadius: "3px", textTransform: "none", width: "100%", height: "100%", display: 'flex', justifyContent: "space-around", "&:hover": { backgroundColor: "#2B3588" }, maxHeight: "40px" }} onClick={handleTextFieldClick}>
                        <input type="file" style={{ display: "none" }} accept=".png,.jpg,.jpeg,.pdf" onChange={handleSingleFileUpload} ref={fileInputRef} />
                        <FileUploadOutlinedIcon />Upload
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}

