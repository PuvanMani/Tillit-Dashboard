import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import axios from "axios";

const filter = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name
});

export default function FreeSoloCreateOptionDialog({ placeholder }) {
    const [open, setOpen] = React.useState(false); // if dropdown open?

    const [value, setValue] = React.useState([]);
    const [openDialog, openDialogOpen] = React.useState(false);

    const [data, setData] = React.useState([]);

    const loading = open && data.length === 0; // is it still loading



    const handleClose = () => {
        setDialogValue({
            name: "",
            image: ""
        });

        openDialogOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        name: "",
        image: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue([
            ...value,
            {
                name: dialogValue.name,
                image: dialogValue.image
            }
        ]);

        setData([
            ...data,
            {
                name: dialogValue.name,
                image: dialogValue.image
            }
        ]);

        handleClose();
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(value);
    };

    return (
        <React.Fragment>
            <Autocomplete
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                loading={loading}
                multiple
                value={value}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            openDialogOpen(true);
                            setDialogValue({
                                name: newValue,
                                slug: "",
                                image: ""
                            });
                        });
                    } else if (
                        newValue.slice(-1)[0] &&
                        newValue.slice(-1)[0].inputValue
                    ) {
                        openDialogOpen(true);
                        setDialogValue({
                            name: newValue.slice(-1)[0].inputValue,
                            slug: "",
                            image: ""
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const isExisting = options.some(
                        (option) => params.inputValue === option.name
                    );
                    if (params.inputValue !== "" && !isExisting) {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}" Category`
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={data}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === "string") {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option, { inputValue }) => {
                    const matches = match(option.name, inputValue);
                    const parts = parse(option.name, matches);

                    return (
                        <li {...props}>
                            <div>
                                {parts.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            color: part.highlight ? "#550000" : "inherit",
                                            fontWeight: part.highlight ? 700 : 400
                                        }}
                                    >
                                        {part.text}
                                    </span>
                                ))}
                            </div>
                        </li>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                        size="small"
                        fullWidth
                        placeholder={placeholder}
                    />
                )}
            />

            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Add Color</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add Color With Same Color Image
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue.name}
                        onChange={(event) =>
                            setDialogValue({
                                ...dialogValue,
                                name: event.target.value
                            })
                        }
                        label="Color"
                        type="text"
                        variant="standard"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        margin="dense"
                        id="image"
                        value={dialogValue.image}
                        onChange={(event) =>
                            setDialogValue({
                                ...dialogValue,
                                image: event.target.value
                            })
                        }
                        label="image"
                        type="file"
                        variant="standard"
                        fullWidth
                        size="small"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
