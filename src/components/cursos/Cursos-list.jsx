import React, { useState, useEffect } from 'react';
import { AcademicCapIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


export default function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCursos = async () => {
    try {
      const response = await api.get('/curso');
      setCursos(response.data.cursos);
    } catch (err) {
      setError(err.message || 'Error al cargar cursos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/curso/${id}`);
      fetchCursos();
    } catch (err) {
      setError('Error al eliminar curso');
      console.error('Error al eliminar curso:', err);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando cursos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Cursos</h1>
        <Link
          to="/curso/nuevo"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Nuevo Curso
        </Link>
      </div>

      <div className="overflow-hidden border border-slate-200 rounded-xl">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {cursos.map((curso) => (
              <tr key={curso._id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">{curso.nombre}</td>
                <td className="px-6 py-4 text-slate-600">{curso.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    to={`/curso/editar/${curso._id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Editar
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 flex items-center"
                    onClick={() => handleDelete(curso._id)}
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}