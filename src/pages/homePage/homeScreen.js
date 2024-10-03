import React, { useState, useEffect } from 'react';
import axios from 'axios';


function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách phim từ Spring Boot
    axios.get('http://localhost:9011/api/movies/DTO')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Có lỗi xảy ra:', error));
  }, []);

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
                    <img src="/img/CRS.jpg" className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/CRS2.png" className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/CRS.jpg" className="d-block w-100" alt="..." />
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
                <img src="/img/Romantic.jpg" className="card-img-top" alt="Lãng mạn" />
                <div className="card-body text-center">
                  <h5 className="card-title">Lãng mạn</h5>
                  <a href="/products?genre=Romantic" className="btn btn-dark mt-3">More</a>
                </div>
              </div>
            </div>
            {/* Category 2 */}
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="/img/Action.jpg" className="card-img-top" alt="Hành động" />
                <div className="card-body text-center">
                  <h5 className="card-title">Hành động</h5>
                  <a href="/products?genre=Action" className="btn btn-dark mt-3">More</a>
                </div>
              </div>
            </div>
            {/* Category 3 */}
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="/img/Horrified.jpg" className="card-img-top" alt="Kinh dị" />
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
            {movies.length === 0 ? (
              <p>No movies available.</p>
            ) : (
              movies.map((movie, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card mb-4" style={{ minHeight: '560px' }}>
                    <img src={`/img/${movie.posterUrl}`} className="card-img-top" alt={movie.title} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">
                        ⭐ {movie.rating > 0 ? `${movie.rating}/10` : 'No rating'}
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
        </div>
      </main>

    </div>
  );
}

export default HomePage;