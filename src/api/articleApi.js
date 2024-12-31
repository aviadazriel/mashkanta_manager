import axiosInstance from "./axios";

export const fetchArticles = async () => {
  const response = await axiosInstance.get("/articles/");
  return response.data;
};

export const createArticle = async (article) => {
  const response = await axiosInstance.post("/articles/", article);
  return response.data;
};

export const updateArticle = async (id, article) => {
  const response = await axiosInstance.put(`/articles/${id}`, article);
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await axiosInstance.delete(`/articles/${id}`);
  return response.data;
};
