import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';

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
        <ContainerCustom>
            <Title>Weather</Title>
            <WeatherCard>
                <Location>{location}</Location>
                <Temperature>{temperature}°C</Temperature>
                <Condition>
                    <WeatherIcon className={`bi ${weatherCondition === 'Clear' ? 'bi-sun' : 'bi-cloud'}`} weatherCondition={weatherCondition} />
                    {weatherCondition}
                </Condition>
            </WeatherCard>
        </ContainerCustom>
    );
};

export default WeatherComponent;

const ContainerCustom = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
`;

const WeatherCard = styled.div`
  width: 25rem;
  background: linear-gradient(135deg, #72EDF2 10%, #5151E5 100%);
  color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const Location = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Temperature = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 10px 0;
`;

const Condition = styled.p`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const WeatherIcon = styled.i`
  font-size: 2rem;
  margin-right: 10px;
  color: ${props => (props.weatherCondition === 'Clear' ? '#FFD700' : '#ffffff')};
`;
