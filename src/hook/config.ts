import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-ojt-hcm24-react06-group04.vercel.app',
});

const authen = localStorage.getItem('token');

// Request interceptor
if (authen != null) {
    api.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
}

// Response interceptor
api.interceptors.response.use(
    function (response) {
        if (response.data && response.data.data) {
            response.data = response.data.data;
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default api;