import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api';

export default function PublicacionesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaCreacion: new Date(),
    cursoId: ''
  });

  const fetchCursos = async () => {
    try {
      const response = await api.get('/curso/curso');
      setCursos(response.data.cursos || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchPost = async (id) => {
    try {
      const response = await api.get(`/post/${id}`);
      const post = response.data.post || response.data;
      setFormData({
        titulo: post.titulo,
        descripcion: post.descripcion,
        fechaCreacion: new Date(post.fechaCreacion),
        cursoId: post.cursoId?._id || post.cursoId || ''
      });
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  useEffect(() => {
    fetchCursos();
    if (id) fetchPost(id);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, fechaCreacion: date });
  };

  const formatDateForBackend = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fechaCreacion: formatDateForBackend(formData.fechaCreacion),
        cursoId: formData.cursoId
      };

      if (id) {
        await api.put(`/post/${id}`, dataToSend);
      } else {
        await api.post('/post/create', dataToSend); // Cambiado a /post/create
      }
      navigate('/post');
    } catch (err) {
      console.error('Error saving post:', err.response?.data || err.message);
      alert('Error al guardar: ' + (err.response?.data?.message || err.message));
    }
    window.location.reload(); 
  };
  useEffect(() => {
    fetchPublicaciones();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        {id ? 'Editar Publicación' : 'Nueva Publicación'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos del formulario se mantienen igual */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de Creación</label>
          <DatePicker
            selected={formData.fechaCreacion}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Curso</label>
          <select
            name="cursoId"
            value={formData.cursoId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso._id} value={curso._id}>
                {curso.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/post')}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            {id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}