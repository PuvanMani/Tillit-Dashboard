import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import Menubar from "../Menubar/Menubar";
// import Routerspage from "../Router/router";
import {
  BrowserRouter,
  Route,
  Outlet,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import Login from "../../Pages/Login";
import { Box } from "@mui/system";
import PageRoute from "../Router/pageroute";
import FormRoute from "../Router/formRoute";
function Layout() {
  let loc = useLocation()
  let location = useNavigate();
  // useEffect(() => { }, [location.location]);
  return (
    <>

      <Routes>
        <Route path="/" element={<LayOutsMenu />}>
          {PageRoute.map((value, ind) => (
            <Route path={value["path"]} element={value["element"]} key={ind} />
          ))}
          {FormRoute.map((rou, ind) => (
            <Route path={rou["path"]} element={rou["element"]} key={ind} />
          ))}
          <Route path={":id"} element={<div>404 Page Not Found</div>} />
        </Route>

      </Routes>


    </>
  );
}


function LayOutsMenu() {
  return (
    <div>
      <div style={{ position: "fixed" }}>
        <Sidebar />
      </div>
      <Box sx={{ marginLeft: { xs: 0, md: "265px" } }}>
        {/* <Menubar />  */}

        <Menubar />
        <div
          style={{
            padding: "2.5%",
          }}>
          <Outlet />
        </div>
      </Box>

    </div>
  );
}


function ProfileMenu() {
  return (
    <div>

      <Outlet />

    </div>
  );
}
export default Layout;
