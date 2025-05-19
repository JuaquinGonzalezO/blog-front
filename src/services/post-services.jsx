import axios from "axios";

const apiClient = axios.create({
 baseURL: "http://127.0.0.1:3000/app",  
  timeout: 5000,
});
export async function getPostById(id) {
  try {
    const res = await fetch(`http://localhost:4000/api/posts/${id}`);
    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error cargando publicación:", error);
    return null;
  }
}
export const createPost = async (postData) => {
  try {
    if (postData.fechaCreacion && typeof postData.fechaCreacion === "string") {
      const [year, month, day] = postData.fechaCreacion.split("-");
      postData.fechaCreacion = new Date(`${year}-${month}-${day}`);
    }

    const response = await apiClient.post("/post/createPost", postData);
    return response.data.post;
  } catch (error) {
    console.error("Error al crear post:", error.response?.data || error);
    throw error;
  }
};

export const getSearchPostsByTitle = async (titulo) => {
  try {
    const cleanTitle = titulo.trim();
    const response = await apiClient.get(`/post/search?name=${cleanTitle}`);
    return response.data.posts;
  } catch (error) {
    console.error("Error al buscar posts por título:", error.response?.data || error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    if (postData.fechaCreacion && typeof postData.fechaCreacion === "string") {
      const [year, month, day] = postData.fechaCreacion.split("-");
      postData.fechaCreacion = new Date(`${year}-${month}-${day}`);
    }

    const response = await apiClient.put(`/post/${id}`, postData);
    return response.data.post;
  } catch (error) {
    console.error("Error al actualizar post:", error.response?.data || error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar post:", error.response?.data || error);
    throw error;
  }
};
