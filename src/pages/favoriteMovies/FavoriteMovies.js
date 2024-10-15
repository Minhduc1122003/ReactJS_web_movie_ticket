import React, { useState } from 'react';
import './FavoriteMovies.css'; // Import file CSS
return(
    <div className="container mt-5 favorite-movies-container">
      <h2 className="title">Quản lý phim yêu thích</h2>

      <div className="list-group mt-4">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map(movie => (
            <div key={movie.id} className="list-group-item movie-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{movie.title}</h5>
                <p className="mb-0">Năm phát hành: {movie.year}</p>
              </div>
              <button
                onClick={() => handleRemoveMovie(movie.id)}
                className="btn btn-danger"
              >
                Xóa
              </button>
            </div>
          ))
        ) : (
          <p>Không có phim yêu thích nào.</p>
        )}
      </div>

      <div className="mt-4 add-movie-form">
        <h4>Thêm phim yêu thích</h4>
        <div className="form-group">
          <label htmlFor="movieTitle">Tên phim:</label>
          <input
            type="text"
            className="form-control"
            id="movieTitle"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            placeholder="Nhập tên phim"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="movieYear">Năm phát hành:</label>
          <input
            type="number"
            className="form-control"
            id="movieYear"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
            placeholder="Nhập năm phát hành"
          />
        </div>
        <button className="btn btn-primary mt-3 add-movie-btn" onClick={handleAddMovie}>
          Thêm phim
        </button>
      </div>
    </div>
    );
export default FavoriteMovies;
