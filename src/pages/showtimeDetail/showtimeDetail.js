import React, { useState } from 'react';
import './showtimeDetail.css';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import axios from 'axios';

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

const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};

function ShowtimeSelection() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [fileLabel, setFileLabel] = useState("Choose File");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileLabel(selectedFile ? selectedFile.name : "Choose File");
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:9011/api/movies/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImageUrl(response.data);
            alert('Upload successful!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed!');
        }
    };

    return (
        <Container className="mt-5">
            <div className="img">
                <h2>Upload Image</h2>
                <label className="custom-file-upload">
                    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    {fileLabel}
                </label>
                
                {file && (
                    <button onClick={handleUpload}>Upload</button>
                )}

                {imageUrl && (
                    <div>
                        <h3>Uploaded Image:</h3>
                        <img src={imageUrl} alt="Uploaded file" width="200" />
                    </div>
                )}
            </div>

            <div className="divider">
                <h2>CHỌN SUẤT CHIẾU</h2>
            </div>
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
                            wrap={true}
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
