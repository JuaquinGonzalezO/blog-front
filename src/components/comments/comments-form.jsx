import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function CommentsForm({ postId, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comentario/`);
      setComments(response.data.comments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contenido: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombreUsuario.trim()) {
      formData.nombreUsuario = 'Anónimo';
    }

    try {
      await api.post('/comentario/create', {
        ...formData,
        publicacionId: postId
      });
      setFormData({ nombreUsuario: '', contenido: '' });
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
    window.location.reload(); 
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mt-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Añadir Comentario</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            name="contenido"
            value={formData.contenido}
            onChange={handleChange}
            rows="3"
            placeholder="Escribe tu comentario..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Publicar Comentario
        </button>
      </form>
    </div>
  );
}
