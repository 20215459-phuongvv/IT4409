import axios from 'axios';
const LOCALHOST = 'http://localhost:8080';

export const API_BASE_URL = LOCALHOST;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

const token = "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTU5MjkwNTUsImV4cCI6MTcxNjAxNTQ1NSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.4xwpm82dC9fz2n7SOo27fK17HBBjTvZzK9VCscuJW0JiyX-_pV5Kkpg-lqwkqdoBbqowiMqS_kIKCKhrgccvVg"

console.log("token", token);
// token


axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosClient.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosClient;
