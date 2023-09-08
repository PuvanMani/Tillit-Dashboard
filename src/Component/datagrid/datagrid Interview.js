import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_URL } from "../../Config/Config";
export default function Interviewtable({ Head, Body, setEditatedData, What, setEducationInformation, EducationInformation }) {

  const handleChange = (e, field, ind) => {
    Body[ind][field] = e.target.value
    setEditatedData([...Body])
  }
  const handleDelete = (e, field, ind) => {
    if (field.EmpEdID) {
      BASE_URL.post("/employeeinfo/deleteeducation", { EmpEdID: field.EmpEdID }).then(res => {
        if (res.data.Status) {
          setEditatedData([...(Body.filter(val => val.EmpEdID != field.EmpEdID))])
          setEducationInformation([...(EducationInformation.filter(val => val.EmpEdID != field.EmpEdID))])
        }
      })
    } else {
      setEditatedData([...(Body.filter(val => val.EED_Coures != field.EED_Coures && val.EED_GPA_Percentage != field.EED_GPA_Percentage))])
      setEducationInformation([...(EducationInformation.filter(val => val.EED_Coures != field.EED_Coures && val.EED_GPA_Percentage != field.EED_GPA_Percentage))])
    }
  }
  return (
    <TableContainer component={Paper} sx={{ overflow: { xs: "scroll", md: "hidden" } }}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#FAFBFF", boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em", color: "#FFF", borderRadius: "3px", }}>
          <TableRow>
            {Head.map(val => (<TableCell sx={{ borderLeft: "1px solid #DDDDDD", fontWeight: "700" }}>{val.name}</TableCell>))}
            {What && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody sx={{ textAlign: "center", width: "100%" }}>
          {Body.length != 0 ? Body.map((row, index) => (
            <TableRow key={index} >
              {Head?.map((val, ind) => (<TableCell sx={{ width: "200px" }} component="th" key={ind} scope="row" ><TextField value={val.type == "type" ? new Date(row[val.field]) : row[val.field]} type={val.type} placeholder={row[val.field] ? "" : "-"} size="small" fullWidth onChange={(e) => handleChange(e, val.field, index)} /></TableCell>))}
              {What && <TableCell> <IconButton onClick={(e) => handleDelete(e, row, index)}><DeleteIcon color="error" /></IconButton></TableCell>}
            </TableRow>
          )) : <TableRow>
            <TableCell colSpan={10}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert icon={false} sx={{ '& .MuiAlert-message': { textAlign: "center", width: "100%" }, backgroundColor: "#FFF" }}>No Data !</Alert>
              </Stack>
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
