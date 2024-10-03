import axios from 'axios';

const API_BASE_URL = 'http://uat-hrm.reecorp.vn/hrm/api/userv2'; 

const _apiProvider = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

_apiProvider.interceptors.request.use(
  config => {
    // Bạn có thể thêm token ở đây nếu cần
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Thêm phương thức login
export const login = async (username, password, siteId) => {
  try {
    const response = await api.post('/login', {
      username,
      password,
      siteId,
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export default _apiProvider;
