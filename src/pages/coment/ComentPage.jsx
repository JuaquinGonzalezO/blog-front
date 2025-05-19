import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ComentList from '../../components/coments/ComentsList';
import ComentForm from '../../components/coments/ComentsForm';

export default function ComentPage() {
  return (
    <Routes>
      <Route index element={<ComentList />} />
      <Route path="new" element={<ComentForm />} />
      <Route path="edit/:id" element={<ComentForm />} />
    </Routes>
  );
}
