import axios from "axios";
const baseUrl = "https://8qq7qc3p-3000.usw3.devtunnels.ms/api/auth";

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const signUp = async (info) => {
  const response = await axios.post(`${baseUrl}/sign-up`, info);
  return response.data;
};

export default { login, signUp };
