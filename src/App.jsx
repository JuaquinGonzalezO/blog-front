import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CursoPage from "../src/pages/curso/CursoPage";
import PublicPage from "../src/pages/publicacion/PublicPage";
import FiltersPage from "../src/pages/filters/FiltersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="cursos/*" element={<CursoPage />} />
        <Route path="post/*" element={<PublicPage />} /> 
        <Route path="filters/*" element={<FiltersPage />} />
      </Route>
    </Routes>
  );
}