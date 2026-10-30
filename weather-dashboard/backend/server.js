const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Weather Dashboard API is running!'
    });
});

// Weather endpoint
app.get('/api/weather', async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide a city name.'
            });
        }

        if (!API_KEY) {
            return res.status(500).json({
                status: 'error',
                message: 'Weather API configuration is missing.'
            });
        }

        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            }
        );

        const weatherData = response.data;

        res.json({
            status: 'success',
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            feels_like: weatherData.main.feels_like,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed,
            icon: weatherData.weather[0].icon
        });

    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).json({
                status: 'error',
                message: 'City not found.'
            });
        }

        console.error('Weather API error:', error.message);

        res.status(502).json({
            status: 'error',
            message: 'Unable to retrieve weather data.'
        });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});