import React, { useState } from "react";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import PageRoute from "./pageroute";
import FormRoute from "./formRoute";
import { data } from "../../Assets/JSON/data";

function Routerspage() {
  return (
    <React.Fragment>
      {/* <Routes> */}
        {PageRoute.map((value, ind) => (
          <Route path={value["path"]} element={value["element"]} key={ind} />
        ))}
        {FormRoute?.map((rou, ind) => (
          <Route path={rou["path"]} element={rou["element"]} key={ind} />
        ))}
        <Route path={"/*"} element={<div>404 Page Not Found</div>} />
      {/* </Routes> */}
    </React.Fragment>
  );
}

export default Routerspage;