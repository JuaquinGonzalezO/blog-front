import React, { useState, useEffect } from 'react';
import { NewspaperIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import api from '../../api.js';  
import CommentsList from "../../components/comments/comments-list";
import CommentsForm from "../../components/comments/comments-form"; 

export default function PublicacionesList() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublicaciones = async () => {
    try {
      const response = await api.get('/post/post');
      
      // Ajuste para manejar diferentes estructuras de respuesta
      const posts = response.data.post || response.data.posts || response.data;
      if (Array.isArray(posts)) {
        setPublicaciones(posts);
      } else if (posts && typeof posts === 'object') {
        // Si es un solo objeto, lo convertimos a array
        setPublicaciones([posts]);
      } else {
        setPublicaciones([]);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar publicaciones');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/post/${id}`);
      fetchPublicaciones(); // Recargar la lista después de eliminar
    } catch (err) {
      setError('Error al eliminar publicación');
      console.error('Error al eliminar publicación:', err);
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando publicaciones...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Publicaciones</h1>
        <Link
          to="/publicaciones/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Nueva Publicación
        </Link>
      </div>

      <div className="overflow-hidden border border-slate-200 rounded-xl">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Publicación</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {publicaciones.length > 0 ? (
              publicaciones.map((publicacion) => (
                <tr key={publicacion._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-slate-800 mb-2">{publicacion.titulo}</h2>
                      <p className="text-slate-600 mb-2">{publicacion.descripcion}</p>
                      <p className="text-sm text-slate-500">
                        {publicacion.fechaCreacion && new Date(publicacion.fechaCreacion).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                      <Link
                        to={`/publicaciones/editar/${publicacion._id}`}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded flex items-center text-sm"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                      <button
                        className="px-3 py-1 bg-red-100 text-red-600 rounded flex items-center text-sm"
                        onClick={() => handleDelete(publicacion._id)}
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Eliminar
                      </button>
                    </div>

                    {/* Sección de comentarios */}
                    <div className="mt-6 border-t pt-4">
                      <h3 className="font-medium text-slate-700 mb-3">Comentarios</h3>
                      <CommentsList postId={publicacion._id} />
                      <CommentsForm postId={publicacion._id} onCommentAdded={() => fetchPublicaciones()} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center text-slate-500">
                  No hay publicaciones disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}