import axiosInstance from "./axios";

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/users_manager/");
  return response.data;
};

export const createUser = async (user) => {
  const response = await axiosInstance.post("/users_manager/", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axiosInstance.put(`/users_manager/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users_manager/${id}`);
  return response.data;
};
