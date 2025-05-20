import axios from "axios";

const API_URL = "http://localhost:3001/api/cursos";

export const createCurso = async (cursoData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, cursoData);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error.response?.data || { success: false, message: 'Error creating course' };
  }
};

export const getCursos = async (limite = 10, desde = 0) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: { limite, desde }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting courses:', error);
    throw error.response?.data || { success: false, message: 'Error getting courses' };
  }
};
