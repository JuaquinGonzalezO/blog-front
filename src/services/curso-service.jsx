import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm/",
  timeout: 5000,  
});



export const createCurso = async (cursoData) => {
  try {
    const response = await apiClient.post('/cursos', cursoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el curso:', error);
    throw error.response?.data || { message: 'Error al crear el curso' };
  }
};

export const getCursos = async () => {
  try {
    const res = await axios.get('/api/cursos'); 
    return { success: true, posts: res.data };
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    return { success: false, posts: [] };
  }
};