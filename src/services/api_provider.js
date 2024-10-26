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

// Lấy toàn bộ phim
export const getAllMovieView = async () => {
  try {
    const response = await fetch('http://localhost:9011/api/movies/getAllMovieView');

    if(!response.ok){
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Có lỗi: " + error);
    throw error;
  }
};

// Lấy phim theo trạng thái
export const getAllMovieViewByStatus = async (statusMovie) => {
  try {
    const response = await fetch(`http://localhost:9011/api/movies/getAllMovieView/${statusMovie}`);

    if(!response.ok){
      throw new Error("Mạng có vấn đề");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Có lỗi: ", error);
    throw error;
  }
};

// Login
export const login = async (username, password) => {
  try {
      const response = await fetch('http://localhost:9011/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage); // Ném lỗi nếu response không ok
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      throw error; // Ném lại lỗi để xử lý ở nơi gọi
  }
};

// Register
export const registerUser = async (newUser) => {
  try {
    const response = await fetch('http://localhost:9011/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi xảy ra: ", error);
    throw error;
  }
};

// Update account
export const updateUser = async (id, newUser) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  try {
    const response = await fetch(`http://localhost:9011/api/users/update/${id}`, { // Truyền id qua URL
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser), // Truyền đối tượng User mới
    });

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi cập nhật người dùng!");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Lỗi mạng hoặc server!", error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
  };

  try {
      const response = await fetch('http://localhost:9011/api/logout', {
          method: 'POST',
          headers: headers
      });

      if(!response.ok){
          throw new Error("Có lỗi xảy ra khi đăng xuất !");
      }

      return response;
  } catch (error) {
      console.error("Lỗi mạng hoặc server !");
      throw error;
  }
};

// Get userDetail
export const userDetail = async(id) => {
  const token = localStorage.getItem('token');
  const header = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(`http://localhost:9011/api/users/getById/${id}`,{
      method: 'GET',
      headers: header
    });

    if(!response){
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Lỗi: ', error);
    throw Error;
  }
};

export default _apiProvider;
