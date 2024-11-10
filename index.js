import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY || 'e8967399aa80d920450097a11d50b91b';

async function fetchWeatherData(city)
 {
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${city}`);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    const data = await response.json();
    if (data.success === false || !data.location) throw new Error(data.error?.info || `No data for city ${city}`);
    return {
        city: data.location.name,
        temperature: data.current.temperature,
        description: data.current.weather_descriptions[0],
        wind_speed: data.current.wind_speed,
        humidity: data.current.humidity
    };
}


function formatWeatherHtml(weather1, weather2 = null, comparisonResult = '')
 {
    return `
        <!DOCTYPE html>
        <html>
            <head><title>Weather Comparison</title></head>
            <body>
                <h1>Weather for ${weather1.city}</h1>
                <p><strong>Temperature:</strong> ${weather1.temperature}°C</p>
                <p><strong>Description:</strong> ${weather1.description}</p>
                <p><strong>Wind Speed:</strong> ${weather1.wind_speed} km/h</p>
                <p><strong>Humidity:</strong> ${weather1.humidity}%</p>

                ${weather2 ? `
                    <h1>Weather for ${weather2.city}</h1>
                    <p><strong>Temperature:</strong> ${weather2.temperature}°C</p>
                    <p><strong>Description:</strong> ${weather2.description}</p>
                    <p><strong>Wind Speed:</strong> ${weather2.wind_speed} km/h</p>
                    <p><strong>Humidity:</strong> ${weather2.humidity}%</p>
                ` : ''}

                ${comparisonResult ? `<h2>Comparison Result: ${comparisonResult}</h2>` : ''}
            </body>
        </html>
    `;
}


app.get('/weather', async (requesting, responding) => {
    const { city, format = 'json' } = requesting.query;
    if (!city) return responding.status(400).send('Please provide a city');

    try {
        const weatherInfo = await fetchWeatherData(city);
        if (format === 'html') {
            responding.send(formatWeatherHtml(weatherInfo));
        } else {
            responding.json(weatherInfo);
        }
    } catch (error) {
        responding.status(500).send({ error: error.message });
    }
});

// Route to compare weather between two cities
app.get('/compareWeather', async (requesting, responding) => {
    const { city1, city2, format = 'json' } = requesting.query;
    if (!city1 || !city2) return responding.status(400).send('Please provide both city1 and city2');

    try {
        const [weather1, weather2] = await Promise.all([fetchWeatherData(city1), fetchWeatherData(city2)]);
        const tempDifference = Math.abs(weather1.temperature - weather2.temperature).toFixed(1);
        const comparisonResult =
            weather1.temperature === weather2.temperature
                ? `${city1} and ${city2} have the same temperature of ${weather1.temperature}°C`
                : `${city1} is ${weather1.temperature < weather2.temperature ? 'colder' : 'warmer'} than ${city2} by ${tempDifference}°C`;

        if (format === 'html') {
            responding.send(formatWeatherHtml(weather1, weather2, comparisonResult));
        } else {
            responding.json({
                city1: weather1,
                city2: weather2,
                comparisonResult
            });
        }
    } catch (error) {
        responding.status(500).send({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
