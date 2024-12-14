import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './FavoriteMovies.css';
import { getAllFavouriteMovieViewByUserId } from '../../services/api_provider';
import { Spinner } from "react-bootstrap";


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
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
                    <i style={{ color: "yellow", textShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)" }} className="bi bi-star-fill"></i> {movie.rating > 0 ? `${movie.rating}/10` : 'No rating'}
                  </p>
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
