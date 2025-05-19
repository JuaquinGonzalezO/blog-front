import { useState, useEffect } from "react";
import { createPost, updatePost, getPostById } from "../../services/post-services";
import { getCursos } from "../../services/curso-service";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    loadCursos();
    if (id) loadPost(id);
  }, [id]);

  const loadCursos = async () => {
    const cursosData = await getCursos();
    setCursos(cursosData);
  };

  const loadPost = async (postId) => {
    const post = await getPostById(postId);
    if (post) {
      setTitulo(post.titulo || "");
      setDescripcion(post.descripcion || "");
      setFechaCreacion(post.fechaCreacion?.slice(0, 10) || "");
      setCursoId(post.cursoId?._id || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { titulo, descripcion, fechaCreacion, cursoId };

    const res = id ? await updatePost(id, data) : await createPost(data);
    if (res.success) {
      navigate("/posts");
    } else {
      alert("Error guardando el post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
      </div>
      <div>
        <label>Fecha de creación:</label>
        <input type="date" value={fechaCreacion} onChange={e => setFechaCreacion(e.target.value)} required />
      </div>
      <div>
        <label>Curso:</label>
        <select value={cursoId} onChange={e => setCursoId(e.target.value)} required>
          <option value="">Seleccione un curso</option>
          {cursos.map(curso => (
            <option key={curso._id} value={curso._id}>{curso.nombre}</option>
          ))}
        </select>
      </div>
      <button type="submit">{id ? "Actualizar" : "Crear"} Post</button>
    </form>
  );
}
