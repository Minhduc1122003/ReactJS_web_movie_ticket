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
    if (userString === null) {
      navigate('/login');
    } else {
      const user = JSON.parse(userString);
      setUserId(user.userId);
    }
  }, [navigate, userString]);

  // Gọi API để lấy danh sách phim yêu thích khi có userId
  useEffect(() => {
    if (userId) {
      getAllFavouriteMovieViewByUserId(userId)
        .then(data => setMovies(data))
        .catch(error => console.error('Lỗi xảy ra:', error));
    }
  }, [userId]);


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

      <div className="pagination">
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
