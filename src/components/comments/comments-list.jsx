import React, { useState, useEffect } from 'react';
import { ChatBubbleLeftIcon, UserIcon, CalendarIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from '../../api'; 

export default function CommentsList({ postId }) {
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <div className="text-center py-4">Cargando comentarios...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 flex items-center">
        <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
        Comentarios
      </h3>

      {comments.length === 0 ? (
        <p className="text-slate-500">No hay comentarios aún</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <UserIcon className="h-4 w-4 mr-1" />
                <span className="mr-3">{comment.nombreUsuario}</span>
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{new Date(comment.fechaComentario).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-700 mb-2">{comment.contenido}</p>
              <button 
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
                onClick={() => handleDelete(comments._id)}
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Eliminar
                
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}