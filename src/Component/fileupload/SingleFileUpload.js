import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import { TextField, Autocomplete, autocompleteClasses } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function SingleFileUpoload({ setImageURL, ErrorObj, disable }) {
    const fileInputRef = useRef(null);
    const [DocumentName, setDocumentName] = useState("")
    const handleFileInputChange = (event) => {
        return new Promise((resolve, reject) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setDocumentName(event.target.files["0"].name)
                const base64 = reader.result;
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
            handleFileInputChange(event).then(res => {
                setImageURL(res)
            })
        }
    }


    const handleTextFieldClick = () => {
        fileInputRef.current.click();
    };
    return (
        <Stack>
            <input type="file" style={{ display: "none" }} accept=".jpg,.jpeg" onChange={handleSingleFileUpload} ref={fileInputRef} />
            <Autocomplete

                sx={{
                    [`& .${autocompleteClasses.popupIndicator}`]: {
                        transform: "none"
                    }
                }}
                readOnly
                options={[]}
                disabled={disable}
                value={DocumentName}
                popupIcon={<FileUploadOutlinedIcon sx={{ color: '#5E6366' }} />}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        fullWidth
                        value={DocumentName}
                        onClick={handleTextFieldClick}
                        error={ErrorObj["ImageUrl"]}
                        helperText={ErrorObj["ImageUrl"] ? `Image is required` : ""}
                        placeholder="Choose File"
                    />
                )}
            />
        </Stack>
    );
}