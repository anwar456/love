import React from "react";
import { Routes, Route } from "react-router-dom";
import Resolusion from "./Resolusion";

export default function ResolusionRouting() {
  return (
    <>
      <Routes>
        <Route path="">
          <Route path="" element={<Resolusion />} />
        </Route>
      </Routes>
    </>
  );
}
