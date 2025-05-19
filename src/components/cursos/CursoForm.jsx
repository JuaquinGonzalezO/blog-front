import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Grid, Box } from '@mui/material';
import { createCurso } from '../../services/curso-service';

const CursoForm = ({ onCreate }) => {
  const [curso, setCurso] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createCurso(curso);
    if (res.success) {
      alert('Curso creado');
      setCurso({ nombre: '', descripcion: '' });
      onCreate();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Crear Curso
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Nombre del Curso"
              variant="outlined"
              fullWidth
              size="medium"
              value={curso.nombre}
              onChange={(e) => setCurso({ ...curso, nombre: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              size="medium"
              value={curso.descripcion}
              onChange={(e) => setCurso({ ...curso, descripcion: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth size="large">
              Crear Curso
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CursoForm;
