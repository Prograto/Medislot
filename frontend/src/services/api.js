import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 Global response handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Unauthorized → logout
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      toast.error("Session expired. Please login again.");

      // Redirect safely
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }

    return Promise.reject(error);
  }
);

export default api;
