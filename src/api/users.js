import axios from "./axios.js";

export const usersApi = {
  getAll: async (page = 1, search = "") => {
    const response = await axios.get(`/users?page=${page}&?search=${search}`);
    return response.data;
  },

  searchUsers: async (searchTerm) => {
    const response = await axios.get(`/users/?search=${searchTerm}`);
    return response.data;
  },

  deleteUsers: async (id) => {
    const response = await axios.delete(`/users/:${id}`);
    return response.data;
  }
}; 