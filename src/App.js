import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./app/Layout/AppLayout";
import GalleryRouting from "./app/pages/Gallery/GalleryRouting";
import Resolusion from "./app/pages/Resolution/Resolusion";
import QuotesRouting from "./app/pages/Quotes/QuotesRouting";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<GalleryRouting />} />
        <Route path="gallery" element={<GalleryRouting />} />
        <Route path="resolution" element={<Resolusion />} />
        <Route path="quotes" element={<QuotesRouting />} />
      </Route>
    </Routes>
  );
}
