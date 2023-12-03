import React from "react";
import { Routes, Route } from "react-router-dom";
import Gallery from "./Gallery";

export default function GalleryRouting() {
  return (
    <>
      <Routes>
        <Route path="">
          <Route path="" element={<Gallery />} />
        </Route>
      </Routes>
    </>
  );
}
