import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./movieScreen.css";
import {
  movieDetail,
  getShowtimeByMovieId,
  addFavourite,
  deleteFavourite,
  getAllRateByMovieId,
  submitReview,
  checkWatched
} from "../../services/api_provider";
import YouTube from "react-youtube";
import { Button, Carousel, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

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
  const [rating, setRating] = useState(0); // Mặc định là 0 sao
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(0);
  const [watched, setWatched] = useState(false);
  const location = useLocation();

  const [isDisabled, setIsDisabled] = useState(false); // Quản lý  
  const [timeLeft, setTimeLeft] = useState(0); // Quản lý thời gian đếm ngược

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString != null) {
      const user = JSON.parse(userString);
      setUserId(user.userId);
    }
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const movieData = await movieDetail(movieId); // Gọi hàm lấy dữ liệu phim
        setMovie(movieData); // Cập nhật trạng thái với dữ liệu phim
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        // setLoading(false); // Đặt loading thành false sau khi gọi xong
      }
    };

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

    fetchRates(); // Lấy dữ liệu đánh giá
    fetchMovieDetail(); // Gọi hàm để lấy dữ liệu
    setReview(0);
  }, [movieId, review]); // Gọi lại khi movieId thay đổi

  useEffect(() => {
    const fetchWatchStatus = async () => {
      try {
        const data = await checkWatched(userId, movieId);
        console.log(data);
        setWatched(true);
      } catch (err) {
        setWatched(false);
      }
    };

    fetchWatchStatus();
  }, [userId, movieId]);

  const toggleShowtimes = async () => {
    setIsDisabled(true); // Vô hiệu hóa nút
    setTimeLeft(10); // Đặt thời gian đếm ngược là 10 giây

    // Đếm ngược thời gian
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown); // Dừng đếm khi hết thời gian

          return 0; // Reset thời gian
        }
        return prevTime - 1; // Giảm thời gian
      });
    }, 1000);

    setShowtimeLoading(true); // Bắt đầu trạng thái loading cho suất chiếu
    try {
      const data = await getShowtimeByMovieId(movieId); // Gọi hàm lấy dữ liệu suất chiếu
      setShowtimes(data); // Cập nhật trạng thái với dữ liệu suất chiếu
      setShowShowtimes(true); // Hiển thị suất chiếu
      setIsDisabled(false); // Kích hoạt lại nút
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    } finally {
      setShowtimeLoading(false); // Đặt loading cho suất chiếu thành false sau khi gọi xong
    }
  };

  // Nhóm các suất chiếu theo ngày
  const groupedShowtimes = showtimes.reduce((acc, current) => {

    const today = new Date();
    const optionDate = { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' };
    const optionTime = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const dayNow = today.toLocaleDateString('en-CA', optionDate); // Ex: "YYYY-MM-DD"
    const timeNow = today.toLocaleTimeString('en-GB', optionTime); // Ex: "HH:MM:SS"

    const date = current.showtimeDate;
    if (date >= dayNow) {
      if (!acc[date]) {
        acc[date] = { date: date, times: [] };
      }
      if (date === dayNow) {
        if (current.startTime >= timeNow) {
          acc[date].times.push({
            startTime: current.startTime,
            cinemaRoomId: current.cinemaRoomId,
            showtimeId: current.showtimeId,
          });
        }
      } else {
        acc[date].times.push({
          startTime: current.startTime,
          cinemaRoomId: current.cinemaRoomId,
          showtimeId: current.showtimeId,
        });
      }
    }
    return acc;
  }, {});

  const sampleShowtimes = Object.values(groupedShowtimes); // Chuyển đổi thành mảng để hiển thị


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
          <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
          <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
          <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
          <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
        </svg>
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found!</div>; // Hiển thị thông báo nếu không tìm thấy phim
  }

  const getYouTubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleFavourite = async () => {
    localStorage.setItem('redirectAfterLogin', location.pathname); // Truyền link trước khi qua đăng nhập để nó quay về
    try {
      if (userId === 0) {
        const result = await Swal.fire({
          title: "Thông báo",
          text: "Vui lòng đăng nhập để thích phim !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đăng nhập",
          cancelButtonText: "Hủy"
        });
        if (result.isConfirmed) {
          // Điều hướng đến trang đăng nhập khi nhấn "Đăng nhập"
          navigate("/login");
        }
        return;
      }

      setIsDisabled(true); // Vô hiệu hóa nút
      setTimeLeft(10); // Đặt thời gian đếm ngược là 10 giây

      // Đếm ngược thời gian
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown); // Dừng đếm khi hết thời gian

            return 0; // Reset thời gian
          }
          return prevTime - 1; // Giảm thời gian
        });
      }, 1000);

      const favouriteRequest = {
        movieId: parseInt(movieId),
        userId,
      };

      if (!movie.favourite) {
        // Nếu chưa yêu thích, gọi hàm addFavourite
        const data = await addFavourite(favouriteRequest);
        console.log("Đã thêm vào danh sách yêu thích:", data);
        setIsDisabled(false); // Kích hoạt lại nút
      } else {
        const data = await deleteFavourite(favouriteRequest);
        console.log("Đã xóa khỏi danh sách yêu thích", data);
        setIsDisabled(false); // Kích hoạt lại nút
      }

      setMovie((prevMovie) => ({
        ...prevMovie,
        favourite: !prevMovie.favourite,
      }));
    } catch (error) { }
  };

  // Hàm chia các giờ chiếu thành nhóm nhỏ
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  //Gửi đánh giá
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(timeLeft);
    console.log(watched);
    try {
      if (userId === 0) {
        localStorage.setItem('redirectAfterLogin', location.pathname);
        const result = await Swal.fire({
          title: "Thông báo",
          text: "Vui lòng đăng nhập để thích phim !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đăng nhập",
          cancelButtonText: "Hủy"
        });
        if (result.isConfirmed) {
          // Điều hướng đến trang đăng nhập khi nhấn "Đăng nhập"
          navigate("/login");
        }
        return;
      }

      setIsDisabled(true); // Vô hiệu hóa nút
      setTimeLeft(10); // Đặt thời gian đếm ngược là 10 giây

      // Đếm ngược thời gian
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown); // Dừng đếm khi hết thời gian

            return 0; // Reset thời gian
          }
          return prevTime - 1; // Giảm thời gian
        });
      }, 1000);

      const movieInt = Number(movieId);

      const rate = {
        movieId: movieInt,
        userId: userId,
        content: comment,
        rating: rating
      };

      console.log(rate);
      const data = await submitReview(rate);
      console.log(data);
      await Swal.fire({
        title: 'Thành công',
        text: 'Đánh giá thành công !',
        icon: 'success',
        timer: 1000, // Thời gian hiển thị (2 giây)
        timerProgressBar: true,
        showConfirmButton: false
      });
      setIsDisabled(false); // Kích hoạt lại nút
      setRating(0);
      setComment('');
      setReview(1);
    } catch (error) {
      await Swal.fire({
        title: 'Thành công',
        text: 'Đánh giá thất bại !',
        icon: 'success',
        timer: 1000, // Thời gian hiển thị (2 giây)
        timerProgressBar: true,
        showConfirmButton: false
      });
      console.error(error);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };



  return (
    <div className="container mb-5 mt-5">
      <div className="row movieDetail">
        <div className="col-md-3">
          <div>
            <img
              src={`${movie.posterUrl}`}
              alt={movie.title}
              className="img-fluid rounded"
            />
          </div>

          {movie.statusMovie === 'Đang chiếu' ? (
            <div>
              <button className="btn btn-outline-dark" onClick={toggleShowtimes} disabled={isDisabled}>
                Chọn suất
              </button>
            </div>
          ) : (
            <div></div>
          )}


        </div>

        <div className="col-md-9 movie-info text-start">
          <h1>
            {movie.title}
          </h1>
          <div className="my-3">
            <div className="text-center inblock movieDetail-boder-right">
              <strong>Ngày khởi chiếu:</strong>
              <br /> {movie.releaseDate}
            </div>
            <div className="text-center inblock movieDetail-boder-right">
              <strong>Thời lượng:</strong>
              <br /> {movie.duration} phút
            </div>
            <div className="text-center inblock">
              <strong>Ngôn ngữ:</strong>
              <br /> {movie.subTitle ? "Phụ đề" : "Lồng tiếng"}
            </div>
          </div>

          <div className="my-3">
            <strong>Thể loại:</strong> {movie.genres}
          </div>
          <div className="my-3">
            <strong>Tuổi tác:</strong> {movie.age}
          </div>

          <div className="my-3">
            <strong>Diễn viên:</strong> {movie.actors}
          </div>

          <button
            className={`btn ${movie.favourite ? "btn-danger" : "btn-outline-danger"
              } me-2`}
            onClick={handleFavourite}
            disabled={isDisabled}
          >
            <i className="bi bi-balloon-heart"></i>{" "}
            {movie.favourite ? "Đã thích" : "Thích"}
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={() => setShowTrailer(true)}
          >
            <i className="bi bi-play-circle"></i> Xem trailer
          </button>

          <div className="review-container">
            <div className="rating-columns">
              <div className="rating-header-column">
                <div className="rating-header">
                  <span className="star-icon">★</span>
                  <span className="score">{movie.averageRating}</span>/10
                  <span className="text-muted">
                    {" "}
                    ({movie.reviewCount} đánh giá)
                  </span>
                </div>
              </div>

              <div className="rating-bars-column">
                {[
                  { range: "9-10", count: movie.rating9_10 },
                  { range: "7-8", count: movie.rating7_8 },
                  { range: "5-6", count: movie.rating5_6 },
                  { range: "3-4", count: movie.rating3_4 },
                  { range: "1-2", count: movie.rating1_2 },
                ].map(({ range, count }) => (
                  <div key={range} className="rating-bar-container">
                    <div className="rating-label">{range}</div>
                    <div className="rating-bar">
                      <div
                        className="rating-bar-inner"
                        style={{
                          width: `${movie.reviewCount === 0
                            ? 0
                            : (count / movie.reviewCount) * 100
                            }%`,
                        }}
                      ></div>
                    </div>
                    <div className="rating-count">
                      {movie.reviewCount === 0
                        ? 0
                        : Math.round((count / movie.reviewCount) * 100)}
                      %
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
        <div className="my-3 movie-description-text">{movie.description}</div>
      </div>

      {/* Hiển thị suất chiếu nếu có */}
      {showShowtimes && (
        <div>
          <div className="divider">
            <h2>CHỌN SUẤT CHIẾU</h2>
          </div>
          {/* Kiểm tra xem showtimeLoading có phải là true không */}
          {showtimeLoading ? (
            <div>Đang tải suất chiếu...</div> // Thông báo khi đang tải
          ) : (
            sampleShowtimes
              .filter((showtime) => showtime.times && showtime.times.length > 0)
              .map((showtime) => (
                <Row key={showtime.date} className="mb-5">
                  <Col xs={12} className="text-center">
                    <h5 className="fw-bold text-dark mb-3">
                      {new Date(showtime.date).toLocaleDateString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
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
                            {timeChunk.map(
                              ({ startTime, cinemaRoomId, showtimeId }) => (
                                <Button
                                  key={startTime}
                                  variant={
                                    selectedShowtime ===
                                      `${showtime.date}-${startTime}`
                                      ? ""
                                      : "outline-secondary"
                                  }
                                  onClick={() => {
                                    console.log(
                                      `Chọn suất chiếu: ${showtime.date} - ${startTime}`
                                    );
                                    console.log(
                                      `Cinema Room ID: ${cinemaRoomId}`
                                    ); // Log cinemaRoomId khi chọn
                                    console.log(`CinemaRoomId: ${showtimeId}`);
                                    setSelectedShowtime(
                                      `${showtime.date}-${startTime}`
                                    );

                                    navigate(`/dat-cho/${movieId}`, {
                                      state: {
                                        cinemaRoomId,
                                        showtimeId,
                                        movieTitle: movie.title,
                                        movieAge: movie.age,
                                        startTime,
                                        showtimeDate: showtime.date,
                                        moviePrice: movie.price,
                                        subTitle: movie.subTitle
                                          ? "Phụ đề"
                                          : "Lồng tiếng",
                                      },
                                    });
                                  }}
                                  className="mx-2"
                                  style={{ minWidth: "80px" }}
                                >
                                  {startTime}
                                </Button>
                              )
                            )}
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

      {/* Đánh giá */}
      {watched ? (
        <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
          <h4 className="mb-3">Đánh giá & Bình luận</h4>

          <div className="mb-3">

            <div className="star-rating">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${index < rating ? 'filled' : ''}`}
                  onClick={() => handleStarClick(index)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Bình luận</label>
            <textarea
              id="comment"
              className="form-control"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập bình luận của bạn..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={rating === 0 || isDisabled}>
            {isDisabled ? `Đang gửi` : "Gửi đánh giá"}
          </button>
        </form>
      ) : (
        <div></div>
      )}
      <div className="divider">
        <h2>Đánh giá</h2>
      </div>


      <div className="gop-y">
        <div className="span-gop-y">
          <span>{rates.length} Góp ý</span>
        </div>
        <hr></hr>
        {Array.isArray(rates) && rates.length > 0 ? (
          rates.map((rate, index) => (
            <div key={index} className="rate-item">
              <div className="rate-avt">
                <img
                  src={`${rate.photo}`}
                  alt={`${rate.fullName}`}
                  className="rate-img"
                />
              </div>
              <div className="rate-body">
                <div className="rate-info">
                  <h3>{rate.fullName}</h3>
                  <h5 className="rating">
                    {rate.rating}/10{" "}
                    <i
                      style={{
                        color: "yellow",
                        textShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
                      }}
                      className="bi bi-star-fill"
                    ></i>
                  </h5>
                  <p className="rate-date text-secondary">
                    {new Date(rate.ratingDate).toLocaleString()}
                  </p>
                </div>
                <p className="rate-content">{rate.content}</p>
                <hr></hr>
                <div className="rate-footer">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#" className="link-dark">Thích</a>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#" className="link-dark">Bình luận</a>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào cho bộ phim này.</p>
        )}
      </div>

      {/* Modal trailer */}
      {showTrailer && (
        <div className="trailer-modal">
          <div
            className="trailer-overlay"
            onClick={() => setShowTrailer(false)}
          ></div>
          <div className="trailer-content">
            <YouTube
              videoId={getYouTubeId(movie.trailerUrl)}
              opts={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
