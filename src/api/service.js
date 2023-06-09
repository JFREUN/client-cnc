import axios from "axios";
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
  throw err;
};

const storedToken = localStorage.getItem('authToken');
 
const getPosts = () => {
  return api.get("/posts")
    .then((res) => res.data)
    .catch(errorHandler);
};

const getUserPosts = () => {
  return api.get("/profile", { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((res) => res.data)
  .catch(errorHandler);
}
 
const uploadImage = (file) => {
  return api.post("/upload", file, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(res => res.data)
    .catch(errorHandler);
};
 
const createPost = (newPost) => {
  return api.post("/posts", newPost, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(res => res.data)
    .catch(errorHandler);
};
 
export default {
  getPosts,
  uploadImage,
  createPost,
  getUserPosts
};