import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.1.107:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;