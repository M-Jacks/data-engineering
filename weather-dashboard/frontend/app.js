const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');

const weatherCard = document.getElementById('weather-card');
const message = document.getElementById('message');

weatherForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        return;
    }

    message.textContent = 'Loading weather data...';
    weatherCard.classList.add('hidden');

    try {

        const response = await fetch(
            `/api/weather?city=${encodeURIComponent(city)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Unable to retrieve weather data.');
        }

        // Update the dashboard
        document.getElementById('city-name').textContent = data.city;

        document.getElementById('country').textContent = data.country;

        document.getElementById('temperature').textContent =
            `${Math.round(data.temperature)}°C`;

        document.getElementById('description').textContent =
            data.description;

        document.getElementById('feels-like').textContent =
            `${Math.round(data.feels_like)}°C`;

        document.getElementById('humidity').textContent =
            `${data.humidity}%`;

        document.getElementById('wind-speed').textContent =
            `${data.wind_speed} m/s`;

        message.textContent = '';
        weatherCard.classList.remove('hidden');

        const icon = document.getElementById('weather-icon');

        icon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        icon.alt = data.description;

        // Display the last updated time
        document.getElementById('last-updated').textContent =
            `Last updated: ${new Date().toLocaleTimeString()}`;
    } catch (error) {

        message.textContent = error.message;

        weatherCard.classList.add('hidden');

    }

});

