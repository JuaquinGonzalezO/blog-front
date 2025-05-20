import React, { useState } from 'react';



export default function CommentsForm({ postId, onCommentAdded }) {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contenido: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/comments', {
        ...formData,
        publicacionId: postId
      });
      setFormData({ nombreUsuario: '', contenido: '' });
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

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
            required
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