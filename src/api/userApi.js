import axiosInstance from "./axios";

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/users/");
  return response.data;
};

export const createUser = async (user) => {
  const response = await axiosInstance.post("/users/", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
