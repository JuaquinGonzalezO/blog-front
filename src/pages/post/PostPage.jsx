import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/post-services";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{post.titulo}</h2>
      <p>{post.descripcion}</p>
      <p><strong>Curso:</strong> {post.cursoId?.nombre}</p>
      <p><strong>Fecha:</strong> {new Date(post.fechaCreacion).toLocaleDateString()}</p>

      <h3>Comentarios</h3>
      <ul>
        {[...(post.comentarios || [])]
          .sort((a, b) => new Date(b.fechaComentario) - new Date(a.fechaComentario))
          .map((comentario, index) => (
            <li key={index}>
              <p><strong>{comentario.nombreUsuario}:</strong> {comentario.contenido}</p>
              <small>{new Date(comentario.fechaComentario).toLocaleString()}</small>
            </li>
          ))}
      </ul>
    </div>
  );
}
