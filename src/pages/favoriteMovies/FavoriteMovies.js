import React, { useState } from 'react';
import './FavoriteMovies.css'; // Import CSS for styling

function FavoriteMovies() {
  // State to manage the list of favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState([
    {
      id: 1,
      title: 'Army Of The Dead',
      image: 'https://example.com/army-of-the-dead.jpg',
    },
    {
      id: 2,
      title: 'The Conjuring',
      image: 'https://example.com/the-conjuring.jpg',
    },
    {
      id: 3,
      title: 'My Favorite Person',
      image: 'https://example.com/my-favorite-person.jpg',
    },
    // Add more movie objects as per your requirement
  ]);

  // Function to toggle the "favorite" status of a movie
  const toggleFavorite = (id) => {
    console.log('Toggling favorite for movie with id:', id);
    // Logic to handle favorite button click (optional)
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
              <button className="favorite-button" onClick={() => toggleFavorite(movie.id)}>
                <i className="fas fa-heart"></i> {/* Heart icon */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteMovies;
