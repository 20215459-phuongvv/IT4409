import axios from 'axios';
const LOCALHOST = 'http://localhost:8080';

export const API_BASE_URL = LOCALHOST;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTU3NjI3NzksImV4cCI6MTcxNTg0OTE3OSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.8NnaPwJu6-Ehj039gMBxnW9Z1pWdoGXslxCQo1F-gACNrTMlMBeF_pAZGXGUEyYXmZlfBznMUVSu1yqixIxqdA';
// token


axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosClient.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosClient;
