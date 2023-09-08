import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  Menu,
  Fade,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Search } from "../../Assets/JSON/icons";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import { styled } from "@mui/styles";
import { saveAsExcel } from "../Export Csv/Exportcsv";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#FAFBFF",
    borderTop: "1px solid #DDDDDD",
    borderBottom: "1px solid #DDDDDD",
    borderRight: "1px solid #DDDDDD",
    color: "#8c0000",
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#FAFBFF",
    borderLeft: "1px solid #DDDDDD",
    fontWeight: "700",
  },
  "& .MuiDataGrid-row": {
    borderBottom: "1px solid #DDDDDD",
  },
}));

function CustomToolbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [option, setOption] = useState(5);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showRow = (e) => {
    let value = e.target.value;
    setOption(value);
    if (value) {
      props.setShow(value);
    }
  };

  return (
    <>
      {props.attach ? (
        ""
      ) : (
        <Box
          sx={{
            my: "15px",
            mx: "25px",
            display: { xs: "block", sm: "flex" },
            justifyContent: "space-between",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            value={props.value}
            onChange={props.onChange}
            placeholder="Search"
            InputProps={{
              startAdornment: <Search fontSize="small" />,
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Clear"
                  size="small"
                  style={{ visibility: props.value ? "visible" : "hidden" }}
                  onClick={props.clearSearch}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{
              input: {
                color: "#797B7D",
                "&::placeholder": {
                  opacity: 1,
                  paddingLeft: "10px",
                },
              },
            }}
          />
          {props["import"] ? (
            <Box>
              <Button
                // disabled={props["rows"].length > 0 ? false : true}
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                // endIcon={<KeyboardArrowDownIcon />}
                disableElevation
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 0,
                  border: "1px solid #2B3588",
                  color: "#2B3588",
                  fontSize: "14px !important",
                  py: "3px",
                  px: "15px",
                  mx: 2,
                  textTransform: "none",
                  "&:hover": { color: "#2B3588", border: "1px solid #2B3588" },
                }}
              >
                Export
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={() => {
                    props.Func()
                    // handleClose();
                  }}
                >
                  Excel
                </MenuItem>
              </Menu>
              <Button
                disableElevation
                size="small"
                variant="contained"
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#2B3588",
                  textDecoration: "none",
                  textTransform: "none",
                }}
              >
                Import from Excel
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pt: { xs: 1.5, sm: 0, m: 0 },
              }}
            >
              <Typography
                component="h6"
                style={{ color: "rgba(54, 54, 54, 0.9)" }}
              >
                Showing
              </Typography>
              <select
                value={option}
                style={{ marginLeft: "10px", marginRight: "10px" }}
                onChange={(e) => showRow(e)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
              </select>
              <Typography style={{ color: "rgba(54, 54, 54, 0.9)" }}>
                of result of {props.row.length}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default function MyDataGrid(props) {
  const [rows, setRows] = useState(props.rows);
  const [show, setShow] = useState(5);
  const [pageNo, setpageNo] = useState(0);
  const [searchText, setSearchText] = useState("");

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    if (searchValue) {
      const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
      const filteredRows = rows.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field]);
        });
      });
      setRows(filteredRows);
    } else {
      setRows(props.rows);
    }
  };
  const handleChangePage = (event, newPage) => {
    setpageNo(event["page"]);
    // setPage(newPage);
  };

  useEffect(
    () => {
      setRows(props.rows);
    },
    [props.rows],
    [rows]
  );
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: props["attach"] ? "" : "#FFF",
        px: props["attach"] ? 3 : "20px",
        pb: props["attach"] ? 3 : "30px",
        pt: props["attach"] ? 0 : "20px",
        boxShadow: props["import"] || props["attach"] ? "" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: props["import"] ? "0px 0px 5px 5px" : "10px",
      }}
    >
      <StyledDataGrid
        sx={{
          boxShadow:
            props["import"] || props["attach"]
              ? "0px 4px 4px rgba(0, 0, 0, 0.1)"
              : "0px 0px 4px rgba(0, 0, 0, 0.1)",
          border: "1.5px solid #DDDDDD",
          borderRadius: props["import"]
            ? "0px 0px 5px 5px"
            : props["attach"]
              ? 0
              : "8px",
          color: "#676767",
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700 !important",
          },
          ".MuiDataGrid-cellContent": {
            fontWeight: "500 !important",
          },
        }}
        rows={rows}
        getRowId={(row) => row[props.id]}
        columns={props.columns}
        autoHeight
        disableColumnSelector
        columnHeaderHeight={50}
        checkboxSelection={false}
        disableColumnMenu
        isCellEditable={false}
        disableSelectionOnClick={true}
        pagination
        onPaginationModelChange={handleChangePage}
        paginationModel={{
          pageSize: parseInt(show),
          page: pageNo,
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            setShow: (e) => {
              setShow(e);
              setpageNo(0);
            },
            value: searchText,
            row: props.rows,
            setRows: setRows,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
            import: props["import"] ? props.import : false,
            attach: props["attach"] ? props.attach : false,
            Func: props["Func"]
          },
        }}
      />
    </Box>
  );
}
