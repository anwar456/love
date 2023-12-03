import React from "react";
import { Routes, Route } from "react-router-dom";
import Quotes from "./Quotes";

export default function QuotesRouting() {
  return (
    <>
      <Routes>
        <Route path="">
          <Route path="" element={<Quotes />} />
        </Route>
      </Routes>
    </>
  );
}
