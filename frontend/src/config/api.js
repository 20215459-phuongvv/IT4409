import axios from 'axios';
const LOCALHOST = 'http://localhost:8080';

export const API_BASE_URL = LOCALHOST;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTU3NDU4MTcsImV4cCI6MTcxNTgzMjIxNywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.-0twLgEGVHuE2YcQjM26cJw0p4iEGCLCuUPZBWaicqsPHKcMs3IQ_IWDsCzAbC6OOxQGxIblqfDrmMc5QXMUGA';
// token


axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosClient.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosClient;
