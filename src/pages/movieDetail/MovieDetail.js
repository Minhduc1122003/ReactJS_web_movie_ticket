import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './movieScreen.css';
import { movieDetail, getShowtimeByMovieId, addFavourite, deleteFavourite, getAllRateByMovieId } from '../../services/api_provider';
import YouTube from 'react-youtube';
import { Button, Carousel, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

function MovieDetail() {
  const { movieId } = useParams(); // Lấy movieId từ URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null); // Trạng thái để lưu dữ liệu phim
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [showTrailer, setShowTrailer] = useState(false); // Quản lý trạng thái hiển thị trailer
  const [showtimes, setShowtimes] = useState([]); // Trạng thái để lưu suất chiếu
  const [showtimeLoading, setShowtimeLoading] = useState(false); // Trạng thái cho việc tải dữ liệu suất chiếu
  const [showShowtimes, setShowShowtimes] = useState(false); // Quản lý hiển thị suất chiếu
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [userId, setUserId] = useState(0);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString != null) {
      const user = JSON.parse(userString);
      setUserId(user.userId);
    }
    const fetchMovieDetail = async () => {
      try {
        const movieData = await movieDetail(movieId); // Gọi hàm lấy dữ liệu phim
        setMovie(movieData); // Cập nhật trạng thái với dữ liệu phim
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi gọi xong
      }
    };

    fetchMovieDetail(); // Gọi hàm để lấy dữ liệu
  }, [movieId]); // Gọi lại khi movieId thay đổi

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true); // Bắt đầu tải
        const data = await getAllRateByMovieId(movieId); // Gọi API
        setRates(data); // Lưu dữ liệu vào state
      } catch (err) {
        console.error("Error fetching movie rates:", err);
      } finally {
        setLoading(false); // Hoàn thành tải
      }
    };

    fetchRates();
  }, [movieId]);

  const toggleShowtimes = async () => {
    setShowtimeLoading(true); // Bắt đầu trạng thái loading cho suất chiếu
    try {
      const data = await getShowtimeByMovieId(movieId); // Gọi hàm lấy dữ liệu suất chiếu
      setShowtimes(data); // Cập nhật trạng thái với dữ liệu suất chiếu
      setShowShowtimes(true); // Hiển thị suất chiếu
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    } finally {
      setShowtimeLoading(false); // Đặt loading cho suất chiếu thành false sau khi gọi xong
    }
  };

  // Nhóm các suất chiếu theo ngày
  const groupedShowtimes = showtimes.reduce((acc, current) => {
    const date = current.showtimeDate;
    if (!acc[date]) {
      acc[date] = { date: date, times: [] };
    }
    acc[date].times.push({ startTime: current.startTime, cinemaRoomId: current.cinemaRoomId, showtimeId: current.showtimeId });
    return acc;
  }, {});

  const sampleShowtimes = Object.values(groupedShowtimes); // Chuyển đổi thành mảng để hiển thị

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading nếu dữ liệu chưa được tải
  }

  if (!movie) {
    return <div>Movie not found!</div>; // Hiển thị thông báo nếu không tìm thấy phim
  }

  const getYouTubeId = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleFavourite = async () => {
    try {
      if (userId === 0) {
        await Swal.fire({
          title: 'Thông báo',
          text: 'Vui lòng đăng nhập để thích phim !',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
      const favouriteRequest = {
        movieId: parseInt(movieId),
        userId
      };

      if (!movie.favourite) {
        // Nếu chưa yêu thích, gọi hàm addFavourite
        const data = await addFavourite(favouriteRequest);
        console.log("Đã thêm vào danh sách yêu thích:", data);
      } else {
        const data = await deleteFavourite(favouriteRequest);
        console.log("Đã xóa khỏi danh sách yêu thích", data);
      }

      setMovie((prevMovie) => ({
        ...prevMovie,
        favourite: !prevMovie.favourite,
      }));

    } catch (error) {

    }
  };

  // Hàm chia các giờ chiếu thành nhóm nhỏ
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  return (
    <div className="container mb-5 mt-5">
      <div className="row movieDetail">
        <div className="col-md-3">
          <div>
            <img src={`${movie.posterUrl}`} alt={movie.title} className="img-fluid rounded" />
          </div>

          <div>
            <button className='btn btn-outline-dark' onClick={toggleShowtimes}>
              Chọn suất
            </button>
          </div>
        </div>

        <div className="col-md-9 movie-info text-start">
          <h1>{movie.title} <span className="badge bg-warning text-dark">T18</span></h1>
          <div className='my-3'>
            <div className="text-center inblock movieDetail-boder-right"><strong>Ngày khởi chiếu:</strong><br /> {movie.releaseDate}</div>
            <div className="text-center inblock movieDetail-boder-right"><strong>Thời lượng:</strong><br /> {movie.duration} phút</div>
            <div className="text-center inblock"><strong>Ngôn ngữ:</strong><br /> {movie.subTitle ? 'Phụ đề' : 'Lồng tiếng'}</div>
          </div>

          <div className='my-3'><strong>Thể loại:</strong> {movie.genres}</div>
          <div className='my-3'><strong>Tuổi tác:</strong> {movie.age}</div>

          <div className='my-3'><strong>Diễn viên:</strong> {movie.actors}</div>

          <button
            className={`btn ${movie.favourite ? 'btn-danger' : 'btn-outline-danger'} me-2`}
            onClick={handleFavourite}
          >
            <i className="bi bi-balloon-heart"></i> {movie.favourite ? 'Đã thích' : 'Thích'}
          </button>

          <button className='btn btn-outline-primary' onClick={() => setShowTrailer(true)}>
            <i className="bi bi-play-circle"></i> Xem trailer
          </button>

          <div className="review-container">
            <div className="rating-columns">
              <div className="rating-header-column">
                <div className="rating-header">
                  <span className="star-icon">★</span>
                  <span className="score">{movie.averageRating}</span>/10
                  <span className="text-muted"> ({movie.reviewCount} đánh giá)</span>
                </div>
              </div>

              <div className="rating-bars-column">
                {[
                  { range: "9-10", count: movie.rating9_10 },
                  { range: "7-8", count: movie.rating7_8 },
                  { range: "5-6", count: movie.rating5_6 },
                  { range: "3-4", count: movie.rating3_4 },
                  { range: "1-2", count: movie.rating1_2 }
                ].map(({ range, count }) => (
                  <div key={range} className="rating-bar-container">
                    <div className="rating-label">{range}</div>
                    <div className="rating-bar">
                      <div className="rating-bar-inner" style={{ width: `${movie.reviewCount === 0 ? 0 : (count / movie.reviewCount) * 100}%` }}></div>
                    </div>
                    <div className="rating-count">

                      {movie.reviewCount === 0
                        ? 0
                        :
                        Math.round((count / movie.reviewCount) * 100)}%
                    </div>
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
        <div className='my-3 movie-description-text'>{movie.description}</div>
      </div>

      {/* Hiển thị suất chiếu nếu có */}
      {showShowtimes && (
        <div>
          <div className="divider">
            <h2 >CHỌN SUẤT CHIẾU</h2>
          </div>
          {/* Kiểm tra xem showtimeLoading có phải là true không */}
          {showtimeLoading ? (
            <div>Đang tải suất chiếu...</div> // Thông báo khi đang tải
          ) : (
            sampleShowtimes.map((showtime) => (
              <Row key={showtime.date} className="mb-5">
                <Col xs={12} className="text-center">
                  <h5 className="fw-bold text-dark mb-3">
                    {new Date(showtime.date).toLocaleDateString('vi-VN', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </h5>
                  <Carousel
                    indicators={false}
                    interval={null}
                    controls={true}
                    wrap={true}
                    className="carousel-dark"
                  >
                    {chunkArray(showtime.times, 9).map((timeChunk, index) => (
                      <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                          {timeChunk.map(({ startTime, cinemaRoomId, showtimeId }) => (
                            <Button
                              key={startTime}
                              variant={selectedShowtime === `${showtime.date}-${startTime}` ? "" : "outline-secondary"}
                              onClick={() => {
                                console.log(`Chọn suất chiếu: ${showtime.date} - ${startTime}`);
                                console.log(`Cinema Room ID: ${cinemaRoomId}`); // Log cinemaRoomId khi chọn
                                console.log(`CinemaRoomId: ${showtimeId}`);
                                setSelectedShowtime(`${showtime.date}-${startTime}`);

                                navigate(`/dat-cho/${movieId}`, {
                                  state: {
                                    cinemaRoomId, showtimeId, movieTitle: movie.title, movieAge: movie.age, startTime, showtimeDate: showtime.date,
                                    moviePrice: movie.price, subTitle: movie.subTitle ? 'Phụ đề' : 'Lồng tiếng'
                                  }
                                })
                              }}
                              className="mx-2"
                              style={{ minWidth: '80px' }}
                            >
                              {startTime}
                            </Button>
                          ))}
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>
              </Row>
            ))

          )}
        </div>
      )}

      <div>
        <div className="divider">
          <h2>Đánh giá</h2>
          </div>
          {Array.isArray(rates) && rates.length > 0 ? (
            rates.map((rate, index) => (
              <div key={index} className="rate-item">
                <h4>{rate.fullName}</h4>
                <p className='rate-content'>{rate.content}</p>
                <p className='rating'>{rate.rating}/10 <i style={{color: "yellow", textShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)"}} className="bi bi-star-fill"></i></p>
                <p className='rate-date'>{new Date(rate.ratingDate).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>Chưa có đánh giá nào cho bộ phim này.</p>
          )}
        
      </div>


      {/* Modal trailer */}
      {showTrailer && (
        <div className="trailer-modal">
          <div className="trailer-overlay" onClick={() => setShowTrailer(false)}></div>
          <div className="trailer-content">
            <YouTube videoId={getYouTubeId(movie.trailerUrl)} opts={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
