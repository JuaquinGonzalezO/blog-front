import axios from "axios";

const API_URL = "http://localhost:3000/blog/v1/api/post";

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error.response?.data || { success: false, message: 'Error creating post' };
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/post/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting post:', error);
    throw error.response?.data || { success: false, message: 'Error getting post' };
  }
};

export const searchPosts = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error.response?.data || { success: false, message: 'Error searching posts' };
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error.response?.data || { success: false, message: 'Error updating post' };
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error.response?.data || { success: false, message: 'Error deleting post' };
  }
};