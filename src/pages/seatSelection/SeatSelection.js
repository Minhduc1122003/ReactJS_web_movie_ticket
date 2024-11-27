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
    const [seats, setSeats] = useState([]); // Đổi 'seat' thành 'seats'
    const [totalPriceAll, setTotalPriceAll] = useState(0);
    const rows = [...new Set(seats.map(seat => seat.chairCode[0]))]; // Lấy hàng từ chairCode (ví dụ: A, B, C...)
    const cols = Array.from({ length: 14 }, (_, i) => i + 1); // Có 14 cột
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatId, setSeatId] = useState([]);
    const [comboId] = useState([]);

    // console.log("Cinema Room ID:", cinemaRoomId);
    // console.log("Showtime ID:", showtimeId);
    // console.log("MovieId:", movieId);

    // console.log("movieTitle:", movieTitle);
    // console.log("movieAge:", movieAge);
    // console.log("startTime:", startTime);
    // console.log("showtimeDate:", showtimeDate);
    // console.log("subTitle:", subTitle);
    // console.log("moviePrice:", moviePrice);

    useEffect(() => {
        const fetchSeats = async () => {
            if (cinemaRoomId && showtimeId) { // Điều kiện được đặt bên trong useEffect
                try {
                    const data = await getSeatsByShowtimeAndCinemaRoom(showtimeId, cinemaRoomId);
                    setSeats(data); // Đặt dữ liệu ghế
                } catch (error) {
                    console.error("Error fetching seat details:", error);
                }
            }
        };

        fetchSeats();
    }, [cinemaRoomId, showtimeId]);

    useEffect(() => {
        console.log(selectedSeats);
        console.log(seatId);
        // Khi tính toán, đảm bảo totalPriceAll là một giá trị thập phân
        setTotalPriceAll(parseFloat(selectedSeats.length * moviePrice));
    }, [selectedSeats, moviePrice, seatId]);

    const generateBuyTicketId = (userId, movieId, showtimeId) => {
        const now = new Date();
        const month = now.getMonth() + 1;  // Tháng bắt đầu từ 0, cần cộng thêm 1
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        // Định dạng "MMddHHmmss"
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
            text: `Bạn có chắc muốn đặt vé? Ghế: ${selectedSeats.join(", ")}`, // Hiển thị danh sách ghế đã chọn
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        });

        if (!isConfirmed) {
            return; // Nếu người dùng không đồng ý, dừng hàm
        }

        const user = JSON.parse(userString);
        const userId = user ? user.userId : null;

        const buyTicketId = generateBuyTicketId(userId, movieId, showtimeId);
        console.log(buyTicketId);

        try {
            // Không cần JSON.stringify nếu phương thức `insertBuyTicket` yêu cầu đối tượng
            const buyTicketRequest = {
                buyTicketId,
                userId,
                movieId: parseInt(movieId, 10),
                totalPriceAll,
                showtimeId,
                seatIDs: seatId, // Gửi seatId như một mảng trực tiếp
                comboIDs: comboId
            };

            const data = await insertBuyTicket(buyTicketRequest);

            await Swal.fire({
                title: 'Thành công',
                text: 'Vé đã được đặt thành công!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log("Buy ticket response:", data);
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
        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatSelect)
                ? prevSelectedSeats.filter((s) => s !== seatSelect)
                : [...prevSelectedSeats, seatSelect]
        );
    };

    const handleSeatClick = (event) => {
        const seatSelectID = parseInt(event.target.value, 10);
        setSeatId((preSeatId) =>
            preSeatId.includes(seatSelectID)
                ? preSeatId.filter((s) => s !== seatSelectID)
                : [...preSeatId, seatSelectID]
        );
    };

    const isSelected = (seatSelect) => selectedSeats.includes(seatSelect);

    if (!seats || seats.length === 0) {
        return <div>Seats not found!</div>;
    }

    return (
        <div className="container container-seat seat-selection pt-3">
            <div className="form-dat-ghe">
                <h2>MÀN HÌNH</h2>
                <div className="seat-grid">
                    {rows.map((row) => (
                        <div key={row} className="seat-row">
                            {cols.map((col) => {
                                const seatLabel = `${row}${col}`;
                                const seat = seats.find(s => s.chairCode === seatLabel); // Tìm ghế dựa trên chairCode

                                return (
                                    <button
                                        key={seatLabel}
                                        className={`btn-seat-magrin seat ${seat && seat.reservationStatus ? "reserved" : isSelected(seatLabel) ? "selected" : "available"}`}
                                        onClick={(event) => {
                                            if (seat && !seat.reservationStatus) {
                                                toggleSeatSelection(seatLabel);
                                                handleSeatClick(event);
                                            }
                                        }}
                                        disabled={seat ? seat.reservationStatus : true} // Nếu ghế có `reservationStatus`, thì nút bị vô hiệu hóa
                                        value={seat ? seat.seatID : ''} // Nếu tìm thấy ghế, gán `seatID` làm giá trị của button
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
