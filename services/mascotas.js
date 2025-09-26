import axios from "axios";

const baseUrl = "https://8qq7qc3p-3000.usw3.devtunnels.ms/api/mascotas";

const obtenerMascotas = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default { obtenerMascotas };
