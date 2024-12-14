import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './SeatSelection.css';
import Swal from 'sweetalert2';
import { getSeatsByShowtimeAndCinemaRoom, insertBuyTicket } from '../../services/api_provider';

const SeatSelection = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { cinemaRoomId, showtimeId, movieTitle, movieAge, startTime, showtimeDate, moviePrice, subTitle } = location.state || {};
    console.log(cinemaRoomId);
    console.log("Showtime",showtimeId);
    const [seats, setSeats] = useState([]);
    const [totalPriceAll, setTotalPriceAll] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatId, setSeatId] = useState([]);
    const [comboId] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            if (cinemaRoomId && showtimeId) {
                try {
                    const data = await getSeatsByShowtimeAndCinemaRoom(showtimeId, cinemaRoomId);
                    setSeats(data);
                } catch (error) {
                    console.error("Error fetching seat details:", error);
                }
            }
        };

        fetchSeats();
    }, [cinemaRoomId, showtimeId]);

    useEffect(() => {
        setTotalPriceAll(parseFloat(selectedSeats.length * moviePrice));
    }, [selectedSeats, moviePrice]);

    const generateBuyTicketId = (userId, movieId, showtimeId) => {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        const formattedDate = `${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}${hour < 10 ? '0' : ''}${hour}${minute < 10 ? '0' : ''}${minute}${second < 10 ? '0' : ''}${second}`;
        return `${userId}${movieId}${showtimeId}${formattedDate}`;
    };

    const handleSubmit = async () => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            await Swal.fire({
                title: 'Chưa đăng nhập !',
                text: 'Vui lòng đăng nhập khi đặt vé !',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            navigate(`/login`);
            return;
        }

        const { isConfirmed } = await Swal.fire({
            title: 'Đặt vé',
            text: `Bạn có chắc muốn đặt vé? Ghế: ${selectedSeats.join(", ")}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        });

        if (!isConfirmed) {
            return;
        }

        const user = JSON.parse(userString);
        const userId = user ? user.userId : null;

        const buyTicketId = generateBuyTicketId(userId, movieId, showtimeId);
        try {
            const buyTicketRequest = {
                buyTicketId,
                userId,
                movieId: parseInt(movieId, 10),
                totalPriceAll,
                showtimeId,
                seatIDs: seatId,
                comboIDs: comboId
            };

            const data = await insertBuyTicket(buyTicketRequest);
            console.log(data);

            await Swal.fire({
                title: 'Thành công',
                text: 'Vé đã được đặt thành công!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate('/ve-da-mua');
        } catch (error) {
            await Swal.fire({
                title: 'Thất bại',
                text: 'Đặt vé thất bại. Vui lòng thử lại!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error("Error buying ticket:", error);
        }
    };

    const toggleSeatSelection = (seatSelect) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatSelect)) {
                return prevSelectedSeats.filter((s) => s !== seatSelect);
            } else if (prevSelectedSeats.length < 5) {
                return [...prevSelectedSeats, seatSelect];
            } else {
                Swal.fire({
                    title: 'Thông báo',
                    text: 'Bạn chỉ được chọn tối đa 5 ghế!',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                return prevSelectedSeats;
            }
        });
    };

    const handleSeatClick = (event) => {
        const seatSelectID = parseInt(event.target.value, 10);
        setSeatId((preSeatId) =>
            preSeatId.includes(seatSelectID)
                ? preSeatId.filter((s) => s !== seatSelectID)
                : [...preSeatId, seatSelectID]
        );
        console.log(seatSelectID);
    };

    const isSelected = (seatSelect) => selectedSeats.includes(seatSelect);

    if (!seats || seats.length === 0) {
        return <div>Seats not found!</div>;
    }

    // Chia ghế thành các hàng (10 hàng, mỗi hàng 14 ghế)
    const rows = [];
    for (let i = 0; i < 10; i++) {
        rows.push(seats.slice(i * 14, (i + 1) * 14)); // Mỗi hàng có 14 ghế
    }

    return (
        <div className="container container-seat seat-selection pt-3">
            <div className="form-dat-ghe">
                <h2>MÀN HÌNH</h2>
                <div className="seat-grid">
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                            {row.map((seat) => {
                                const seatLabel = seat.chairCode;
                                return (
                                    <button
                                        key={seatLabel}
                                        className={`btn-seat-magrin seat ${seat.reservationStatus ? "reserved" : isSelected(seatLabel) ? "selected" : "available"}`}
                                        onClick={(event) => {
                                            if (!seat.reservationStatus) {
                                                toggleSeatSelection(seatLabel);
                                                handleSeatClick(event);
                                            }
                                        }}
                                        disabled={seat.reservationStatus}
                                        value={seat.seatID}
                                    >
                                        {seatLabel}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="legend">
                    <div className='position-relative'>
                        <span className="legend-item available"></span><div className='seatDescription' style={{ width: '220%' }}>Ghế trống</div>
                    </div>
                    <div className='position-relative'>
                        <span className="legend-item selected"></span><div className='seatDescription' style={{ width: '291%' }}>Ghế bạn chọn</div>
                    </div>
                    <div className='position-relative'>
                        <span className="legend-item reserved"></span><div className='seatDescription' style={{ width: '158%' }}>Đã đặt</div>
                    </div>
                </div>
                <hr />

                <div className='dat-ve'>
                    <div className="header">
                        <h1 className="movie-title">{movieTitle}</h1>
                        <span className="age-rating">{movieAge}</span>
                    </div>

                    <div className="info">
                        <div className="session-time">
                            <span>Giờ chiếu: {startTime}</span>
                        </div>
                        <div className='black-line'></div>
                        <div className="date">
                            <span>Ngày chiếu: {showtimeDate}</span>
                        </div>
                        <div className='black-line'></div>
                        <div className="subtitles">
                            <span>Ngôn ngữ:</span> <span>{subTitle}</span>
                        </div>
                    </div>

                    <div className="price-info">
                        <span className="temp-price-label">Tạm tính</span>
                        <span className="price">{totalPriceAll} VND</span>
                    </div>

                    <button
                        id="dat-ve-ngay"
                        className="btn btn-outline-danger"
                        disabled={selectedSeats.length === 0}
                        onClick={handleSubmit}
                    >
                        <div className="btn-content">
                            <span className="btn-title">Đặt vé ngay</span>
                            <span className="icon-arrow">
                                <svg width="66px" height="43px" viewBox="0 0 66 43" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M1 21h60M47 7l14 14-14 14" />
                                </svg>
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
