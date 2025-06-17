//This automatically adds the token to headers for protected routes.
import axios from "axios";

// This file sets up an Axios instance for making API requests.
// It configures the base URL for the API and adds an interceptor to include the authentication token
// in the request headers if it exists in localStorage.
// The Axios instance can be used throughout the application to make API calls with the necessary authentication.
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor to add the Authorization header with the token from localStorage
// This interceptor runs before each request is sent, checking if a token exists.
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
