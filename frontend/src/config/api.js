import axios from 'axios';
const LOCALHOST = 'http://localhost:8080';

export const API_BASE_URL = LOCALHOST;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTU2NTYxMjgsImV4cCI6MTcxNTc0MjUyOCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.xzaxy9uT538OUaYAMXcnJUCHmvWOA2rU2EiPGu038zTwFnI4C0340vckwFod5-x7fk-eKCXSY8W8bu-WEB53qQ';
// token


axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosClient.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosClient;
