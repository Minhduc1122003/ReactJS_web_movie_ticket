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
    console.log("Showtime", showtimeId);
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
            localStorage.setItem('redirectAfterLogin', location.pathname);
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
                                <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <path
                                            id="arrow-icon-one"
                                            d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                            fill="#FFFFFF"
                                        ></path>
                                        <path
                                            id="arrow-icon-two"
                                            d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                            fill="#FFFFFF"
                                        ></path>
                                    </g>
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
