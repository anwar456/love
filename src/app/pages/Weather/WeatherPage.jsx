import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast', {
                    params: {
                        location: '-0.1275862,51.5072178',
                        apikey: 'ttOVzssLyIhBhOzO26B6rfcRagm0QOfJ'
                    }
                });
                setWeatherData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) {
        return <div className='mt-3 text-center fs-5'>Loading...</div>;
    }

    if (error) {
        return <div className='mt-3 text-center fs-5'>Error: {error.message}</div>;
    }

    if (!weatherData) {
        return null;
    }

    const minutelyData = weatherData.timelines.minutely[0].values;
    const temperature = minutelyData.temperature;
    const weatherCode = minutelyData.weatherCode;
    const weatherCondition = weatherCode === 1000 ? 'Clear' : 'Cloudy'
    const location = "London";

    return (
        <Container className='mt-3'>
            <h1 className='text-center mb-3'>Weather</h1>
            <div className='d-flex justify-content-center align-items-center'>
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <div className='d-flex flex-column align-items-center'>
                            <p>Location: {location}</p>
                            <p>Temperature: {temperature}°C</p>
                            <p>Condition: {weatherCondition}</p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default WeatherComponent;
