import axios from 'axios';

const API_BASE_URL = 'http://uat-hrm.reecorp.vn/hrm/api/userv2'; // URL API của bạn

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cấu hình interceptor nếu cần thiết
api.interceptors.request.use(
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
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi nếu có
  }
};

export default api;
