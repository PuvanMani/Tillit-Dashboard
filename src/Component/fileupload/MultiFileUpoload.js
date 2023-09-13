import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import { TextField, Autocomplete, autocompleteClasses, IconButton, Backdrop, CircularProgress } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function MultiFileUpoload({ ImageURL, setImageURL, ErrorObj, disable }) {
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(false)
    const handleFileInputChange = (event) => {
        return new Promise((resolve, reject) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result;
                resolve(base64);
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };

            reader.readAsDataURL(file);
        });
    };

    const handleFileUpload = async (event) => {
        if (event.target.files) {
            let newObj = {
                Document: await handleFileInputChange(event),
                DocumentName: event.target.files["0"].name ? event.target.files["0"].name : "",
            }
            setImageURL([...ImageURL, newObj]);
        }
    };

    const handleDeleteChip = (value) => {
        setOpen(true)
        setImageURL([...(ImageURL.filter((doc, ind) => doc.DocumentName !== value.DocumentName))])
        setOpen(false)

    };
    const handleTextFieldClick = () => {
        fileInputRef.current.click();
    };
    return (
        <Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <input id="file-upload" type="file" multiple accept=".png,.jpg,.jpeg,.pdf" style={{ display: "none" }} onChange={handleFileUpload} ref={fileInputRef} />
            <Autocomplete
                multiple
                // disableClearable
                sx={{
                    [`& .${autocompleteClasses.popupIndicator}`]: {
                        transform: "none"
                    }
                }}
                options={[]}
                disabled={disable}
                value={ImageURL?.map(val => val.DocumentName)}
                popupIcon={<FileUploadOutlinedIcon sx={{ color: '#5E6366' }} />}
                renderTags={(value, getTagProps) =>
                    value?.map((option, index) => {
                        const doc = ImageURL.find((doc, ind) => doc.DocumentName === option);
                        return (
                            <Chip
                                disabled={disable}
                                label={doc?.DocumentName}
                                key={doc?.DocumentName}
                                onDelete={() => handleDeleteChip(doc)}
                            />
                        );
                    })
                }

                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        fullWidth
                        onClick={handleTextFieldClick}
                        error={ErrorObj["ImageUrl"]}
                        helperText={ErrorObj["ImageUrl"] ? `ImageUrl is required` : ""}
                        placeholder="Choose File"

                    />
                )}
            />
        </Stack>
    );
}

