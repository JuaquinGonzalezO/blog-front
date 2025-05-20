import { NewspaperIcon, CalendarIcon, TagIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function PublicacionesList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/post'); 
      setPosts(response.data.posts || []);
    } catch (err) {
      setError(err.message || "Error al cargar publicaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/post/${id}`);
      fetchPosts();
    } catch (err) {
      setError(err.message || "Error al eliminar publicación");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando publicaciones...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Publicaciones</h1>
        <Link 
          to="nuevo"  // Corregido: eliminado "/publicaciones/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Nueva Publicación
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">{post.titulo}</h2>
            <div className="flex items-center text-sm text-slate-500 mb-3">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span className="mr-4">{new Date(post.fechaCreacion).toLocaleDateString()}</span>
              {post.cursoId && (
                <>
                  <TagIcon className="h-4 w-4 mr-1" />
                  <span>{post.cursoId.nombre}</span>
                </>
              )}
            </div>
            <p className="text-slate-600 mb-4">{post.descripcion}</p>
            <div className="flex space-x-3">
              <Link 
                to={`editar/${post._id}`}  // Corregido: eliminado "/publicaciones/"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Editar
              </Link>
              <button 
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
                onClick={() => handleDelete(post._id)}
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}