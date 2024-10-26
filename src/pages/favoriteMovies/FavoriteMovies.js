import React, { useState } from 'react';
import './FavoriteMovies.css'; 

function FavoriteMovies() {

  const [favoriteMovies, setFavoriteMovies] = useState([
    {
      id: 1,
      title: 'Army Of The Dead',
      image: 'https://example.com/army-of-the-dead.jpg',
      isFavorite: true,
    },
    {
      id: 2,
      title: 'The Conjuring',
      image: 'https://example.com/the-conjuring.jpg',
      isFavorite: false,
    },
    {
      id: 3,
      title: 'My Favorite Person',
      image: 'https://example.com/my-favorite-person.jpg',
      isFavorite: true,
    },

  ]);


  const toggleFavorite = (id) => {
    setFavoriteMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      )
    );
  };

  return (
    <div className="favorite-movies-container">
      <h2>Phim Yêu Thích</h2>
      <div className="movies-grid">
        {favoriteMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-poster" />
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <button
                className={`favorite-button ${movie.isFavorite ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(movie.id)}
              >
                <i className={`fas fa-heart ${movie.isFavorite ? 'favorited' : ''}`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteMovies;
