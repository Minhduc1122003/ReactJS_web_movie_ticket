import axios from 'axios';

// const API_BASE_URL = 'http://localhost:9011';
const API_BASE_URL = 'https://javaserver-movie-ticket.onrender.com';

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
    const response = await fetch(`${API_BASE_URL}/api/movies/getAllMovieView`);

    if (!response.ok) {
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
    const response = await fetch(`${API_BASE_URL}/api/movies/getAllMovieViewStatus/${statusMovie}`);

    if (!response.ok) {
      throw new Error("Mạng có vấn đề");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Có lỗi: ", error);
    throw error;
  }
};

// Lấy phim theo thể loại
export const getAllMovieViewByGenre = async (genre) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies/getAllMovieViewGenre/${genre}`);

    if (!response.ok) {
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
    const response = await fetch(`${API_BASE_URL}/api/login`, {
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
    console.error(`Lỗi đăng nhập:`, error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi
  }
};

// SendMail
export const sendMail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/mail/sendMail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email)
    });

    if(!response.ok){
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// VerifyOTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/mail/verifyOTP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, otp})
    });

    if(!response.ok){
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return await response.text();
  } catch (error) {
    
  }
};

// Update password
export const uploadPasswordUser = async (id, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/update/password/${id}`, {
      method: `PUT`,
      body: JSON.stringify(password),
    });

    if (!response.ok) {
      throw new Error(`Failed to update password`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error(`Error updating password:`, error);
    throw error;
  }
};


// Avt
export const getAvt = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/getPhotoById/${id}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.text();
    console.log(data);
    return data;

  } catch (error) {
    console.error(`Lỗi:`, error);
    throw error;
  }
};

// Upload avt
export const uploadAvt = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/update-avatar`, {
      method: `PUT`,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to update avatar`);
    }

    const data = await response.text(); // Giả sử API trả về chuỗi phản hồi, ví dụ "Avatar updated successfully"
    return data;
  } catch (error) {
    console.error(`Error updating avatar:`, error);
    throw error;
  }
};

// Register
export const registerUser = async (newUser) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.text();
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
    const response = await fetch(`${API_BASE_URL}/api/users/update/${id}`, { // Truyền id qua URL
      method: `PUT`,
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

// Update updatePasswordByUser
export const updatePasswordByUser = async (UpdatePasswordDTO) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/update/passwordByUser`, {
      method: `PUT`,
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UpdatePasswordDTO), // Truyền mật khẩu cũ và mật khẩu mớimới
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${errorText} (HTTP ${response.status})`);
    }

    const data = await response.text();
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
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: 'POST',
      headers: headers
    });

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi đăng xuất !");
    }

    return response;
  } catch (error) {
    console.error("Lỗi mạng hoặc server !");
    throw error;
  }
};

// Get userDetail
export const userDetail = async (id) => {
  const token = localStorage.getItem(`token`);
  const header = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/getById/${id}`, {
      method: `GET`,
      headers: header
    });

    if (!response) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Lỗi: `, error);
    throw Error;
  }
};

// Get movieDetail
export const movieDetail = async (movieId) => {
  const userString = localStorage.getItem(`user`);
  const user = JSON.parse(userString);
  console.log(user);
  const userId = user ? user.userId : null;
  console.log(userId);

  try {
    const url = `${API_BASE_URL}/api/movies/getMovieDetail/${movieId}${userId ? `?userId=${userId}` : ``}`;

    const response = await fetch(url, {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getShowtimeByMovieId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/showtime/getByMovieId/${id}`, {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getSeatsByShowtimeAndCinemaRoom = async (showtimeId, cinemaRoomId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/seats/showtime/${showtimeId}/cinemaRoom/${cinemaRoomId}`, {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Kiểm tra phản hồi
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export const insertBuyTicket = async (buyTicketRequest) => {
  try {
    console.log(buyTicketRequest);
    const response = await fetch(`${API_BASE_URL}/api/buyticket/createBuyTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buyTicketRequest)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export const delBuyTicket = async (buyTicketId) => {
  try {
    console.log(buyTicketId);
    const response = await fetch(`${API_BASE_URL}/api/buyticket/delBuyTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buyTicketId)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export const getTicketBuyUserId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/getTicketById/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export const addFavourite = async (favouriteRequest) => {
  console.log(`API_provider:`, favouriteRequest);
  try {
    const response = await fetch(`${API_BASE_URL}/favourites/addFavourite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favouriteRequest)
    });

    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export const deleteFavourite = async (favouriteRequest) => {
  console.log(`API_provider:`, favouriteRequest);
  try {
    const response = await fetch(`${API_BASE_URL}/favourites/deletefavourite`, {
      method: `DELETE`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favouriteRequest)
    });

    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

// Lấy toàn bộ phim
export const getAllFavouriteMovieViewByUserId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies/getAllFavouriteMovieByUserId/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Có lỗi: " + error);
    throw error;
  }
};
const getClientIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error("Không thể lấy IP client");
    }
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Lỗi khi lấy IP:", error);
    return null;
  }
};

export const paymentVNP = async (amount, id) => {
  try {
    const clientIp = await getClientIp();
    
    // Kiểm tra nếu không lấy được IP
    if (!clientIp) {
      throw new Error("Không thể lấy IP client");
    }

    const response = await fetch(`${API_BASE_URL}/api/payments/vnpay?amount=${amount}&id=${id}&ip=${clientIp}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Có lỗi: " + error);
    throw error;
  }
};
const syncServerTime = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/server-time`);
    if (!response.ok) {
      throw new Error("Không thể đồng bộ thời gian với server");
    }
    const serverTime = await response.text();
    console.log("Thời gian server:", serverTime);
    // Tùy chỉnh logic theo thời gian server
  } catch (error) {
    console.error("Lỗi khi đồng bộ thời gian:", error);
  }
};

syncServerTime();


export const paymentVNPcallBack = async(params) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/vnpay/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${errorText} (HTTP ${response.status})`);
    }

    const data = await response.text();
    return data;
    
  } catch (error) {
    console.error("Có lỗi: " + error);
    throw error;
  }
};

export const getAllRateByMovieId = async(id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rates/getByMovieId/${id}`);

    if(!response){
      const errorText = await response.text();
      throw new Error(`API Error: ${errorText} (HTTP ${response.status})`);
    }

    const date = await response.json();
    return date;
  } catch (error) {
    console.error("Có lỗi: " + error);
    throw error;
  }
};

export const submitReview = async(rate) =>{
  try {
    const response = await fetch(`${API_BASE_URL}/api/rates/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rate)
    });

    if(!response){
      const errorText = await response.text();
      throw new Error(`API Error: ${errorText} (HTTP ${response.status})`);
    }

    const data = await response.text();
    return data;

  } catch (error) {
    throw error;
  }
};

export default _apiProvider;