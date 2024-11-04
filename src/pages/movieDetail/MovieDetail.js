import React from 'react';
import './movieScreen.css';

function MovieDetail() {

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

  const ratingDistribution = {
    "9-10": 70,
    "7-8": 15,
    "5-6": 10,
    "3-4": 3,
    "1-2": 2,
  };

  return (
    <div className="container mb-5 mt-5">
      <div className="row movieDetail">
        <div className="col-md-3">
          <div className="poster-container">
            <img src={`http://localhost:9011/img/joker.jpg`} alt={movie.title} className="img-fluid rounded" />
            <div className="btn-container">
              <a className="btn-content" href="#">
                <span className="btn-title">Mua vé</span>
                <span className="icon-arrow">
                  <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                      <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-9 movie-info text-start">
          <h1>{movie.title} <span className="badge bg-warning text-dark">T18</span></h1>
          <p>
            <div className="text-center inblock movieDetail-boder-right"><strong>Ngày khỏi chiếu:</strong><br /> {movie.releaseDate}</div>
            <div className="text-center inblock movieDetail-boder-right"><strong>Thời lượng:</strong><br /> {movie.duration}</div>
            <div className="text-center inblock"><strong>Ngôn ngữ:</strong><br /> Phụ đề</div>
          </p>

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

          <div className="review-container">
            <div className="rating-columns">
              <div className="rating-header-column">
                <div className="rating-header">
                  <span className="star-icon">★</span>
                  <span className="score">{movie.rating}</span>/10
                  <span className="text-muted"> ({movie.votes} đánh giá)</span>
                </div>
              </div>

              <div className="rating-bars-column">
                {Object.entries(ratingDistribution).map(([range, percentage]) => (
                  <div key={range} className="rating-bar-container">
                    <div className="rating-label">{range}</div>
                    <div className="rating-bar">
                      <div className="rating-bar-inner" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <div className="rating-count">{percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>




        </div>

      </div>
      <hr></hr>
      <div className="movie-description-section">
        <h4 className="movie-description-title">Nội Dung Phim</h4>
        <p className="movie-description-text">{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
