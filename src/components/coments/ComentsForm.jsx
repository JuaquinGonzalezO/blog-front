import React, { useState } from 'react';
import { createComment } from '../../services/commentsService';

const CommentForm = () => {
  const [form, setForm] = useState({ contenido: '', publicacionId: '', fechaComentario: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createComment(form);
    if (response.success) {
      alert('Comentario creado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="contenido" placeholder="Comentario" onChange={handleChange} />
      <input name="publicacionId" placeholder="ID publicación" onChange={handleChange} />
      <input name="fechaComentario" placeholder="dd/mm/yyyy" onChange={handleChange} />
      <button type="submit">Crear</button>
    </form>
  );
};

export default CommentForm;
