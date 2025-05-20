import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Filters from "./Filters";

export default function FiltersPage() {
  return (
    <Routes>
     <Route path="filters" element={<Filters />} />
    </Routes>
  );
}