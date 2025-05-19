import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostById } from "../../services/post-services";
import { getCursos } from "../../services/curso-service";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState("");

  useEffect(() => {
    loadCursos();
    loadPosts();
  }, []);

  const loadCursos = async () => {
    const cursosData = await getCursos();
    setCursos(cursosData);
  };

  const loadPosts = async (cursoId = "") => {
    let allPosts = await getPostById();
    if (cursoId) {
      allPosts = allPosts.filter(post => post.cursoId?._id === cursoId);
    }
    setPosts(allPosts.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)));
  };

  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    setSelectedCurso(cursoId);
    loadPosts(cursoId);
  };

  return (
    <div>
      <h2>Publicaciones por Curso</h2>
      <select value={selectedCurso} onChange={handleCursoChange}>
        <option value="">Todos los cursos</option>
        {cursos.map(curso => (
          <option key={curso._id} value={curso._id}>{curso.nombre}</option>
        ))}
      </select>

      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3><Link to={`/posts/${post._id}`}>{post.titulo}</Link></h3>
            <p>{new Date(post.fechaCreacion).toLocaleDateString()}</p>
            <p><strong>Curso:</strong> {post.cursoId?.nombre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
