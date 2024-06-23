import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";

export default function DashboarRouting({onLogout}) {
  return (
    <>
      <Routes>
        <Route path="">
          <Route path="" element={<DashboardPage onLogout={onLogout}/>} />
        </Route>
      </Routes>
    </>
  );
}