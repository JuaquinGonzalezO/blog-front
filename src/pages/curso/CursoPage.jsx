import { Routes, Route } from 'react-router-dom';
import CursosList from '../../components/cursos/Cursos-list';
import CursosForm from '../../components/cursos/Cursos-form'  

export default function CursoPage() {
  return (
   <Routes>
      <Route path="/curso" element={<CursosList />} />
     <Route path="/cursos/nuevo" element={<CursosForm />} />
     <Route path="/cursos/editar/:id" element={<CursosForm />} />
  </Routes>

  );
}