import React, { useState, useEffect } from 'react';
import axios from 'axios';


function HomeScreen() {
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
          {/* Divider */}
          <div className="divider">
            <h2>PHIM ĐANG CHIẾU</h2>
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

export default HomeScreen;