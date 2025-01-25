import axios from "axios";

// Use Docker's service name if both are running in the same Docker network
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST || "http://node_container:3001/api", // Use the service name `backend`
  withCredentials: true,
});

export default axiosApi;
