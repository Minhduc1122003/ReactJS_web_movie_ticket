import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './FavoriteMovies.css';
import { getAllFavouriteMovieViewByUserId } from '../../services/api_provider';


function FavoriteMovies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [loading, setLoading] = useState(true); // Trạng thái loading


  // Tính toán số trang dựa trên số lượng phim và itemsPerPage
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // Lấy danh sách phim cho trang hiện tại
  const currentMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm để chọn trang
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  // Hàm để chuyển đến trang tiếp theo
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Hàm để chuyển đến trang trước đó
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Kiểm tra và lấy userId từ localStorage chỉ một lần
  useEffect(() => {
    setLoading(true);
    try {
      if (userString === null) {
        navigate('/login');
      } else {
        const user = JSON.parse(userString);
        setUserId(user.userId);
      }
    } catch (error) {
      console.error("Error", error);

    }finally {
      setLoading(false); // Đặt loading thành false sau khi gọi xong
    }
  }, [navigate, userString]);

  // Gọi API để lấy danh sách phim yêu thích khi có userId
  useEffect(() => {
    setLoading(true);
    try {
      if (userId) {
        getAllFavouriteMovieViewByUserId(userId)
          .then(data => setMovies(data))
          .catch(error => console.error('Lỗi xảy ra:', error));
      }
    } catch (error) {
      console.error("Error movie", error);
    } finally {
      setLoading(false); // Đặt loading thành false sau khi gọi xong
    }
  }, [userId]);

  if (loading) {
    return (
      <div class="d-flex justify-content-center align-items-center">
        <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
          <circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
          <circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
          <circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
          <circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
        </svg>
      </div>
    );
  }

  return (

      <div className="container">
      <div className="divider">
        <h2>Phim yêu thích</h2>
      </div>

      {/* Movies List */}
      <div className="row">
        {currentMovies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          currentMovies.map((movie, index) => (
            <div className="col-md-3" key={index}>
              <div className="card mb-3 item-film" style={{ minHeight: '611px' }}>
                <Link to={`/chi-tiet-phim/${movie.movieId}`}>
                  <img src={`${movie.posterUrl}`} className="card-img-top" alt={movie.title} />
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    Genres: {movie.genres.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination justify-content-center">
        <button className='btn btn-outline-dark' onClick={goToPreviousPage} disabled={currentPage === 1}>
          <i className="bi bi-chevron-compact-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`btn btn-outline-dark ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button className='btn btn-outline-dark' onClick={goToNextPage} disabled={currentPage === totalPages}>
          <i className="bi bi-chevron-compact-right"></i>
        </button>
      </div>
    </div>

  );
}

export default FavoriteMovies;
