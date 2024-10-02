import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apiato.test/v1/',
});

export default api;