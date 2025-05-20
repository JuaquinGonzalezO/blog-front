import { Routes, Route } from 'react-router-dom';
import Commentslist from '../../components/comments/comments-list';
import Commentsform from '../../components/comments/comments-form'  

export default function CursoPage() {
  return (
   <Routes>
     <Route path="/curso" element={<Commentslist />} />
    <Route path="/cursos/nuevo" element={<Commentsform />} />
    <Route path="/cursos/editar/:id" element={<Commentsform />} />

  </Routes>

  );
}