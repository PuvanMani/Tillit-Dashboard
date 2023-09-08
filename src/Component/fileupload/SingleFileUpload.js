import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import { TextField, Autocomplete, autocompleteClasses } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function SingleFileUpoload({ Documents, setDocuments, Key, placeholder, ErrorObj }) {
    const fileInputRef = useRef(null);

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
    return (
        <Stack>
            <input type="file" style={{ display: "none" }} accept={Key == 'Photo' ? ".png,.jpg,.jpeg" : ".png,.jpg,.jpeg,.pdf"} onChange={handleSingleFileUpload} ref={fileInputRef} />
            <Autocomplete

                sx={{
                    [`& .${autocompleteClasses.popupIndicator}`]: {
                        transform: "none"
                    }
                }}
                readOnly
                options={[]}
                value={Documents?.filter(val => val.ED_DocumentType == Key).map(val => val.ED_DocumentName)} popupIcon={<FileUploadOutlinedIcon sx={{ color: '#5E6366' }} />}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        fullWidth
                        onClick={handleTextFieldClick}
                        error={ErrorObj[Key]}
                        helperText={ErrorObj[Key] ? `${Key} is required` : ""}
                        placeholder="Choose File"
                    />
                )}
            />
        </Stack>
    );
}