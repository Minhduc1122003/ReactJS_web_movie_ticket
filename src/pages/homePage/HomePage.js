import React, { useState, useEffect } from 'react';
import { getAllMovieView } from '../../services/api_provider';
import { Link } from 'react-router-dom';
import './homeScreen.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
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

  //Đợi ảnh load
  const handleImageLoad = () => {
    setLoading(false); // Khi ảnh tải xong, tắt trạng thái loading
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
    
    try {
      setLoading(true);
      getAllMovieView()
        .then(data => setMovies(data))
        .catch(error => console.error('Lỗi xảy ra:', error));
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false); // Đặt loading thành false sau khi gọi xong
    }
  }, []);

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
    <div>

      {/* Main Content */}
      <main>
        <div className="container">
          {/* Carousel */}
          <div className="row">
            <div className="col-12 text-center my-4">
              <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/CRS.jpg?alt=media&token=6b8c4daf-b5d4-49df-9613-e3ef8542336a"
                      alt="Movie Poster"
                      className="d-block mx-auto"
                      onLoad={handleImageLoad}
                      onError={handleImageLoad} // Xử lý khi ảnh lỗi
                      
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/CRS2.jpg?alt=media&token=f5a8994d-fd20-497e-89bd-080557a7fd31"
                      alt="Movie Poster"
                      className="d-block mx-auto"
                      onLoad={handleImageLoad}
                      onError={handleImageLoad} // Xử lý khi ảnh lỗi
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/CRS3.jpg?alt=media&token=15f18a81-f008-4805-b5a6-0709421ce9cf"
                      alt="Movie Poster"
                      className="d-block mx-auto"
                      onLoad={handleImageLoad}
                      onError={handleImageLoad} // Xử lý khi ảnh lỗi
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="row">
            {/* Category 1 */}
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/Romantic.jpg?alt=media&token=b555d85b-088f-4447-94dd-f2ffa6b74427" className="card-img-top" alt="Lãng mạn" />
                <div className="card-body text-center">
                  <h5 className="card-title">Lãng mạn</h5>
                  <a href="/products?genre=Romantic" className="btn btn-dark mt-3">More</a>
                </div>
              </div>
            </div>
            {/* Category 2 */}
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/Action.jpg?alt=media&token=f56d57ea-46ee-4f10-b883-08e8b4d3760d" className="card-img-top" alt="Hành động" />
                <div className="card-body text-center">
                  <h5 className="card-title">Hành động</h5>
                  <a href="/products?genre=Action" className="btn btn-dark mt-3">More</a>
                </div>
              </div>
            </div>
            {/* Category 3 */}
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/Horrified.jpg?alt=media&token=145ca538-28cc-42c9-9b9d-f90d99f97627" className="card-img-top" alt="Kinh dị" />
                <div className="card-body text-center">
                  <h5 className="card-title">Kinh dị</h5>
                  <a href="/products?genre=Horror" className="btn btn-dark mt-3">More</a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider">
            <h2>TRANG CHỦ</h2>
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
                        Genres: {movie.genres.join(", ")}
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

export default HomePage;