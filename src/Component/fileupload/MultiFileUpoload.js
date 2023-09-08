import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import { TextField, Autocomplete, autocompleteClasses, IconButton, Backdrop, CircularProgress } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { BASE_URL } from "../../Config/Config";
import ClearIcon from '@mui/icons-material/Clear';
export default function MultiFileUpoload({ Documents, setDocuments, Key, ErrorObj }) {
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(false)
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

    const handleFileUpload = async (event) => {
        if (event.target.files) {
            let newObj = {
                "PID": localStorage.getItem("PID"),
                ED_DocumentType: Key,
                ED_Document: await handleFileInputChange(event),
                ED_DocumentName: event.target.files["0"].name ? event.target.files["0"].name : "",
                ED_DocumentFormat: event.target.files["0"].type ? event.target.files["0"].type : ""
            }
            setDocuments([...Documents, newObj]);
        }
    };

    const handleDeleteChip = (value) => {
        setOpen(true)
        if (value.EmpDocID) {
            BASE_URL.post('/employeeinfo/deletedocuments', { EmpDocID: value.EmpDocID }).then((res) => {
                setDocuments([...(Documents.filter((doc, ind) => doc.ED_DocumentName !== value.ED_DocumentName || doc.ED_DocumentType !== value.ED_DocumentType))])
                setOpen(false)
            })
        } else {
            setDocuments([...(Documents.filter((doc, ind) => doc.ED_DocumentName !== value.ED_DocumentName || doc.ED_DocumentType !== value.ED_DocumentType))])
            setOpen(false)
        }
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
                options={[]} value={Documents?.filter(val => val.ED_DocumentType == Key).map(val => val.ED_DocumentName)}
                popupIcon={<FileUploadOutlinedIcon sx={{ color: '#5E6366' }} />}
                renderTags={(value, getTagProps) =>
                    value?.map((option, index) => {
                        const doc = Documents.find((doc, ind) => doc.ED_DocumentName === option && doc.ED_DocumentType === Key);
                        return (
                            <Chip
                                label={doc?.ED_DocumentName}
                                key={doc?.ED_DocumentName}
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
                        error={ErrorObj[Key]}
                        helperText={ErrorObj[Key] ? `${Key} is required` : ""}
                        placeholder="Choose File"

                    />
                )}
            />
        </Stack>
    );
}

