import axios from "axios";
import { getToken } from "../contexts/TokenStorage";

const instance = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 10000,
});

// Add an Axios request interceptor to set the Authorization header before each request
instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchUserData = () => instance.get("/");
const createPost = (postData) => instance.post("/posts", postData);
const updatePost = (postId, updatedData) => instance.put(`/posts/${postId}`, updatedData);
const registerStaff = (email, password) => instance.post(`/staff/register`, { email, password });
const clientStaff = (email, password) => instance.post(`/client/register`, { email, password });
const loginStaff = (email, password) => instance.post(`/staff/login`, { email, password });
const loginClient = (email, password) => instance.post(`/client/login`, { email, password });

export { fetchUserData, createPost, updatePost, registerStaff, clientStaff, loginStaff, loginClient };
