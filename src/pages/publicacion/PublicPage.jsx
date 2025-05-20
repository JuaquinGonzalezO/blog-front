import { Routes, Route } from 'react-router-dom';
import PostsList from "../../components/publicaciones/publicaciones-list";
import PostForm from "../../components/publicaciones/publicaciones-form";

export default function PostsPage() {
  return (
   <Routes>
  <Route path="" element={<PostsList />} />
  <Route path="nuevo" element={<PostForm />} />
  <Route path="editar/:id" element={<PostForm />} />
</Routes>
  );
}