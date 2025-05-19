import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CursoList from '../../components/cursos/CursoList';
import CursoForm from '../../components/cursos/CursoForm';  
export default function CursoPage() {
  return (
    <Routes>
      <Route index element={<CursoList />} />
      <Route path="new" element={<CursoForm />} />
      <Route path="edit/:id" element={<CursoForm />} />
    </Routes>
  );
}
