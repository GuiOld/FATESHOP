import axios from "axios";

const apiAuth = axios.create({
  baseURL: "https://api-authentic.onrender.com",
});

// Função opcional para setar token de autenticação
export const setAuthToken = (token: string) => {
  apiAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default apiAuth;
