import React, { useEffect, useState } from 'react';
import { fetchComments } from '../../services/commentsService';

const ComentsList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const response = await fetchComments();
      if (response.success) {
        setComments(response.comments); 
      }
    };
    loadComments();
  }, []);

  return (
    <div>
      <h2>Comentarios</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.contenido}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComentsList;
