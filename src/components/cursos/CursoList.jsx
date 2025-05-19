import React from 'react';
import { Link } from 'react-router-dom';

const cursosMock = [
  { _id: '1', nombre: 'Curso A' },
  { _id: '2', nombre: 'Curso B' },
];

export default function CursoList() {
  return (
    <div>
      <h2>Listado de Cursos</h2>
      <Link to="new">
        <button>Crear Nuevo Curso</button>
      </Link>
      <ul>
        {cursosMock.map(curso => (
          <li key={curso._id}>
            {curso.nombre} - <Link to={`edit/${curso._id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
