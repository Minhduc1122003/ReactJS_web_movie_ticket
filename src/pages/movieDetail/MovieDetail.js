import React from 'react';
import { useNavigate } from 'react-router-dom';
import './movieScreen.css';

function MovieDetail() {
  const navigate = useNavigate();

  // Example movie data
  const movie = {
    title: 'Venom: Kèo Cuối',
    duration: '109 Phút',
    releaseDate: '23/10/2024',
    rating: 9.0,
    votes: 220,
    country: 'Mỹ',
    studio: 'Columbia Pictures, Marvel',
    genres: ['Hành Động', 'Giả Tưởng'],
    director: 'Kelly Marcel',
    actors: ['Tom Hardy', 'Juno Temple', 'Chiwetel Ejiofor'],
    description: `Sau chuyến du lịch ngắn sang quê nhà của Spider-Man: No Way Home (2021), Eddie Brock (Tom Hardy) giờ đây cùng Venom “hành hiệp trượng nghĩa” và “nhai đầu” hết đám tội phạm trong thành phố. Tuy nhiên, đi đêm lắm cũng có ngày gặp ma, chính phủ Mỹ đã phát hiện ra sự tồn tại của con quái vật ngoài hành tinh này. Anh chàng buộc phải trở thành kẻ đào tẩu, liên tục trốn chạy khỏi những cuộc truy quét liên tục. Thế nhưng, đây chưa phải là rắc rối lớn nhất… Những con quái vật gớm ghiếc bất ngờ xuất hiện tại nhiều nơi. Hành tinh của chủng tộc Symbiote đã phát hiện ra Trái Đất và chuẩn bị cho cuộc xâm lăng tổng lực. `,

    screenings: [
      { date: 'Hôm Nay 25/10', times: ['19h', '21h'] },
      { date: 'Thứ Bảy 26/10', times: ['18h', '20h'] },
      { date: 'Chủ Nhật 27/10', times: ['17h', '19h'] },
    ],
  };

  return (
    <div className="movie-detail-container container mt-5">

      <div className="row">
        <div className="col-md-3"> 
          <img src="/img/venomkeocuoi.jpg" alt={movie.title} className="img-fluid rounded" />
        </div>

        <div className="col-md-9 movie-info text-start"> 
          <h1>{movie.title} <span className="badge bg-warning text-dark">T13</span></h1>
          <p>{movie.duration} | {movie.releaseDate}</p>

          <div className="d-flex align-items-center mb-3">
            <span className="text-warning me-2" style={{ fontSize: '1.5rem' }}>★ {movie.rating}</span>
            <span className="text-muted">({movie.votes} votes)</span>
          </div>

          <p><strong>Quốc gia:</strong> {movie.country}</p>
          <p><strong>Nhà sản xuất:</strong> {movie.studio}</p>

          <p><strong>Thể loại:</strong>
            {movie.genres.map((genre, index) => (
              <span key={index} className="badge-item">{genre}</span>
            ))}
          </p>

          <p><strong>Đạo diễn:</strong>
            <span className="badge-item">{movie.director}</span>
          </p>

          <p><strong>Diễn viên:</strong>
            {movie.actors.map((actor, index) => (
              <span key={index} className="badge-item">{actor}</span>
            ))}
          </p>

          <hr />

          <h4>Nội Dung Phim</h4>
          <p>{movie.description}</p>
        </div>
      </div>

    </div>
  );
}

export default MovieDetail;
