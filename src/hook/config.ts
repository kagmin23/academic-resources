import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api-ojt-hcm24-react06-group04.vercel.app',
    headers: {
        "content-type": "application/json; charset=UTF-8",
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`,
});

const token = localStorage.getItem('token');

// Request interceptor
if (token != null) {
    axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
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

export default axiosInstance;