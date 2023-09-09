import { Autocomplete, Button, Dialog, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import save from '../../Assets/Images/Completed successfully.png'
import moment from "moment/moment";
import { BASE_URL } from '../../Config/Config';
import { LoadingButton } from '@mui/lab';
import FreeSoloCreateOptionDialog from '../Autocomplete/AddAutocomplete';
function EggForm() {

    const params = useParams()
    const [disable, setDisable] = useState(false);
    const [load, setLoad] = useState(false);

    const nav = useNavigate()
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState("");
    const [projectname, setProjectName] = useState("");
    const [ProjectID, setProjectID] = useState("");
    const [taskname, setTaskName] = useState("");
    const [starttime, setStartTime] = useState("");
    const [endtime, setEndtime] = useState("");
    const [ProjectData, setProjectData] = useState([]);


    const [dial, setDial] = useState(false);
    const [errObj, setErrObj] = useState({
        date: false,
        type: false,
        projectname: false,
        taskname: false,
        starttime: false,
        endtime: false,
    });

    const TaskData = () => {
        BASE_URL.post('/timesheet/listbyid', { TaskID: params.id }).then((res) => {
            if (res.data.Status) {
                setTaskName(res.data.Message[0].TaskName ? res.data.Message[0].TaskName : "")
                setDate(res.data.Message[0].TaskDate ? new Date(res.data.Message[0]?.TaskDate) : "")
                setType(res.data.Message[0].ProjectType ? res.data.Message[0].ProjectType : "")
                setProjectName(res.data.Message[0].ProjectName ? res.data.Message[0].ProjectName : "")
                setStartTime(res.data.Message[0].StartTime ? res.data.Message[0].StartTime : "")
                setEndtime(res.data.Message[0].EndTime ? res.data.Message[0].EndTime : "")
            }
        })
    }

    useEffect(() => {
        if (params.action == 'view' || params.action == 'edit') {
            TaskData()
            if (params.action == 'view') {
                setDisable(true)
            }
        }
        BASE_URL.post('/project/listall').then((res) => {
            if (res.data.Status) {
                setProjectData(res.data.Message[0].ProjectData)
            }
        })
    }, [])

    //Create Function 
    const CreateData = () => {
        setLoad(true)
        // console.log(date)
        let errObj2 = {
            date: date == "" ? true : (date < new Date(moment().subtract(1, 'days').format("MM/DD/YYYY")) || moment(new Date()).format('MM/DD/YYYY') < moment(date).format('MM/DD/YYYY') || new Date().getFullYear() != new Date(date).getFullYear()) ? 'true' : false,
            type: type == "",
            projectname: projectname == "",
            taskname: taskname.trim() == "",
            starttime: starttime == "" ? true : (starttime > moment().format("HH:mm:ss") && moment(new Date()).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY')) ? 'true' : date ? moment(new Date()).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY') ? (starttime > moment().format("HH:mm:ss")) : false : false,
            endtime: endtime == "" ? true : (endtime > moment().format("HH:mm:ss") && moment(new Date()).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY')) ? 'true' : (endtime < starttime || endtime == starttime) ? true : false
        }
        setErrObj(errObj2)
        if (Object.values(errObj2).some((val) => (val == true || val == 'true' || val == 'false'))) {
            setLoad(false)
        } else {
            let data = {
                TaskName: taskname.trim(),
                ProjectID,
                TaskDate: moment(new Date(date)).format('YYYY-MM-DD hh:mm:ss'),
                StartTime: starttime,
                EndTime: endtime,
                CreatedBy: localStorage.getItem('userid'),
                CreatedDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            }
            BASE_URL.put('timesheet/createsheet', data).then((res) => {
                let x = res.data.Status ? setDial(true) : ""
            }).catch((err) => setLoad(false))
        }

    }


    // Update Function 
    const UpdateData = () => {
        var ProjectID = ''
        ProjectData?.map((res) => {
            if (res.ProjectName == projectname) {
                ProjectID = res.ProjectID
            }
        })
        let errObj2 = {
            projectname: projectname == "",
            type: type == "",
            starttime: starttime == "",
            endtime: endtime == "" || endtime < starttime
        }
        setErrObj(errObj2)
        if (Object.values(errObj2).some((val) => val == true)) {

        } else {
            let data = {
                TaskName: taskname,
                ProjectID,
                TaskDate: moment(new Date(date)).format('YYYY-MM-DD hh:mm:ss'),
                StartTime: starttime,
                EndTime: endtime,
            }
            BASE_URL.put('/timesheet/updatesheet', { ...data, TaskID: params.id }).then((res) => {
                let x = res.data.Status ? setDial(true) : ""
            })
        }
    }

    return (
        <Box>
            <Box>
                <Grid container spacing={2} justifyContent="center" sx={{ my: "10px" }}>
                    {/* <Grid item xs={12}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Product Name
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="Product Name"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Available Stock (Count)
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="14"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Market Price ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="699"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Your Price ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="399"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Our Commission ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="399"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            GST ( ₹ )
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="399"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Discription
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="Discription"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            HSN Code
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="JSU999HY"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            sx={{
                                color: "#5E6366",
                                fontSize: "14px !important",
                                mb: "8px",
                            }}
                        >
                            Net Quantity (minimum)
                        </InputLabel>
                        <TextField
                            disabled={disable}
                            value={taskname}
                            onChange={(e) => setTaskName(e.target.value)}
                            size="small"
                            error={errObj["taskname"]}
                            helperText={errObj["taskname"] ? "Task Name is required" : ""}
                            placeholder="1"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default EggForm;