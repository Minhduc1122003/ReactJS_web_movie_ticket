import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllMovieViewByStatus } from '../../services/api_provider';

function MovieStatus() {
  const [movies, setMovies] = useState([]);

  const { statusMovie } = useParams();

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

  useEffect(() => {
    // Gọi API từ api_provider
    getAllMovieViewByStatus(statusMovie)
      .then(data => setMovies(data))
      .catch(error => console.error('Lỗi xảy ra:', error));
  }, [statusMovie]);

  return (
    <div>

      {/* Main Content */}
      <main>
        <div className="container">
          {/* Divider */}
          <div className="divider">
            <h2>PHIM {statusMovie?.toUpperCase()}</h2>
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
                        <i style={{color: "yellow", textShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)"}} className="bi bi-star-fill"></i> {movie.rating > 0 ? `${movie.rating}/10` : 'No rating'}
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

          {/* Nút phân trang */}
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
      </main>

    </div>
  );
}

export default MovieStatus;