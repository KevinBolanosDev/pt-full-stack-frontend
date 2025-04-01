import axios from "./axios.js";

export const usersApi = {
  getAll: async (page = 1) => {
    const response = await axios.get(`/users?page=${page}`);
    return response.data;
  },
}; 