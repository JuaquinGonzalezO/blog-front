import axios from "axios";

const API_URL = "http://localhost:3001/api/comentarios";

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error.response?.data || { success: false, message: 'Error creating comment' };
  }
};

export const getComments = async () => {
  try {
    const response = await axios.get(`/`);
    return response.data;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error.response?.data || { success: false, message: 'Error getting comments' };
  }
};

export const searchComments = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching comments:', error);
    throw error.response?.data || { success: false, message: 'Error searching comments' };
  }
};

export const updateComment = async (id, commentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error.response?.data || { success: false, message: 'Error updating comment' };
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error.response?.data || { success: false, message: 'Error deleting comment' };
  }
};