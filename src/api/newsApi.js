import axiosInstance from "./axios";

export const fetchNews = async () => {
  const response = await axiosInstance.get("/news/");
  return response.data;
};

export const createNews = async (news) => {
  const response = await axiosInstance.post("/news/", news);
  return response.data;
};

export const updateNews = async (id, news) => {
  const response = await axiosInstance.put(`/news/${id}`, news);
  return response.data;
};

export const deleteNews = async (id) => {
  const response = await axiosInstance.delete(`/news/${id}`);
  return response.data;
};
