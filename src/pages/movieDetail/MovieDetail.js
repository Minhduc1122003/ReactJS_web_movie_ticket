import React from 'react';
import './movieScreen.css';

function MovieDetail() {

  // Example movie data
  const movie = {
    title: 'Venom: Kèo Cuối',
    duration: '109 Phút',
    releaseDate: '23/10/2024',
    rating: 9.0,
    votes: 220,
    age: '18',
    genres: ['Hành Động', 'Giả Tưởng'],
    actors: ['Tom Hardy', 'Juno Temple', 'Chiwetel Ejiofor'],
    description: `Sau chuyến du lịch ngắn sang quê nhà của Spider-Man: No Way Home (2021), Eddie Brock (Tom Hardy) giờ đây cùng Venom “hành hiệp trượng nghĩa” và “nhai đầu” hết đám tội phạm trong thành phố. Tuy nhiên, đi đêm lắm cũng có ngày gặp ma, chính phủ Mỹ đã phát hiện ra sự tồn tại của con quái vật ngoài hành tinh này. Anh chàng buộc phải trở thành kẻ đào tẩu, liên tục trốn chạy khỏi những cuộc truy quét liên tục. Thế nhưng, đây chưa phải là rắc rối lớn nhất… Những con quái vật gớm ghiếc bất ngờ xuất hiện tại nhiều nơi. Hành tinh của chủng tộc Symbiote đã phát hiện ra Trái Đất và chuẩn bị cho cuộc xâm lăng tổng lực. `,
  };

  return (
    <div className="container mb-5 mt-5">
      
      <div className="row movieDetail">
        <div className="col-md-3"> 
          <div>
            <img src="/img/joker.jpg" alt={movie.title} className="img-fluid rounded" />
          </div>

          <div>
            <button className='btn btn-outline-dark'>Mua vé</button>
          </div>
        </div>

        <div className="col-md-9 movie-info text-start"> 
          <h1>{movie.title} <span className="badge bg-warning text-dark">T13</span></h1>
          <p>
            <div className="text-center inblock movieDetail-boder-right"><strong>Ngày khỏi chiếu:</strong><br/> {movie.releaseDate}</div> 
            <div className="text-center inblock movieDetail-boder-right"><strong>Thời lượng:</strong><br/> {movie.duration}</div> 
            <div className="text-center inblock"><strong>Ngôn ngữ:</strong><br/> Phụ đề</div>
          </p>

          <div className="d-flex align-items-center mb-3">
            <span className="text-warning me-2" style={{ fontSize: '1.5rem' }}>★ {movie.rating}</span>
            <span className="text-muted">({movie.votes} votes)</span>
          </div>

          <p><strong>Thể loại:</strong>
            {movie.genres.map((genre, index) => (
              <span key={index} className="badge-item">{genre}</span>
            ))}
          </p>
          <p><strong>Tuổi tác:</strong> {movie.age}</p>

          <p><strong>Diễn viên:</strong>
            {movie.actors.map((actor, index) => (
              <span key={index} className="badge-item">{actor}</span>
            ))}
          </p>

          <button className='btn btn-outline-danger me-2'><i className="bi bi-balloon-heart"></i> Thích</button> 
          <button className='btn btn-outline-primary'><i className="bi bi-play-circle"></i> Trailler</button>

          <hr />

          <h4>Nội Dung Phim</h4>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
