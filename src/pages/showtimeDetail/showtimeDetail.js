import React from 'react';
import './showtimeDetail.css';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';

// Dữ liệu tĩnh để hiển thị
const sampleShowtimes = [
    {
        date: '2024-10-28',
        times: ['10:00', '13:00', '15:30', '18:00', '20:30', '22:00']
    },
    {
        date: '2024-10-29',
        times: ['11:00', '14:00', '16:30', '19:00', '21:30']
    },
    {
        date: '2024-10-30',
        times: ['09:00', '12:30', '15:00', '17:30', '20:00']
    }
];

// Hàm chia các giờ chiếu thành nhóm nhỏ
const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};

function ShowtimeSelection() {
    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Chọn Suất Chiếu</h2>
            {sampleShowtimes.map((showtime) => (
                <Row key={showtime.date} className="mb-5">
                    <Col xs={12} className="text-center">
                        <h5 className="fw-bold text-primary mb-3">
                            {new Date(showtime.date).toLocaleDateString('vi-VN', {
                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </h5>
                        <Carousel
                            indicators={false}
                            interval={null}
                            controls={true}
                            wrap={true} // Cho phép lặp vòng
                            className="carousel-dark"
                        >
                            {chunkArray(showtime.times, 4).map((timeChunk, index) => (
                                <Carousel.Item key={index}>
                                    <div className="d-flex justify-content-center">
                                        {timeChunk.map((time) => (
                                            <Button
                                                key={time}
                                                variant="outline-primary"
                                                onClick={() => console.log(`Chọn suất chiếu: ${showtime.date} - ${time}`)}
                                                className="mx-2"
                                                style={{ minWidth: '80px' }}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}

export default ShowtimeSelection;
