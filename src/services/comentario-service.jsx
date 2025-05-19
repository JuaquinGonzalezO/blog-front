import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm/",
  timeout: 5000,  
});




export const createComment = async (commentData) => {
  try {
    const response = await apiClient.post('/comentarios', commentData);
    return response.data;
  } catch (error) {
    console.error('Error al crear comentario:', error);
    throw error.response?.data || { message: 'Error al crear comentario' };
  }
};


export const getComments = async (limite = 10, desde = 0) => {
  try {
    const response = await apiClient.get(`/comentarios?limite=${limite}&desde=${desde}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    throw error.response?.data || { message: 'Error al obtener comentarios' };
  }
};


export const getSearchCommentsByName = async (name) => {
  try {
    const response = await apiClient.get(`/comentarios/search?name=${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar comentarios:', error);
    throw error.response?.data || { message: 'Error al buscar comentarios' };
  }
};

export const updateComment = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/comentarios/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    throw error.response?.data || { message: 'Error al actualizar comentario' };
  }
};


export const deleteComment = async (id) => {
  try {
    const response = await apiClient.delete(`/comentarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    throw error.response?.data || { message: 'Error al eliminar comentario' };
  }
};