# Weather Comparison Service

This service provides a way to fetch and compare weather information for cities using the WeatherStack API. Users can view data in either JSON or HTML format, and compare the temperature between two cities.

## Features

- **Fetch Weather Data**: Retrieve current weather for a specified city, including temperature, weather description, wind speed, and humidity.
- **Compare Two Cities**: Compare temperatures between two cities, showing which is warmer or colder.
- **Flexible Formats**: Choose between JSON and HTML response formats.

## Getting Started

### Prerequisites

- **Node.js** installed.
- **WeatherStack API Key**. Sign up at [WeatherStack](https://weatherstack.com/) to get an API key.

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set your API Key:
   - Replace `WEATHERSTACK_API_KEY` in the code with your key.

4. Start the server:
    ```bash
    npm start
    ```
   Access the service at `http://localhost:3000`.

## Endpoints

### `/weather`

Fetch weather data for a single city.


- **Parameters**:
  - `city` (required): Name of the city.
  - `format` (optional): `json` or `html`. Default is `json`.
- **Example**: 
  - JSON: `http://localhost:3000/weather?city=Coimbra`
  - HTML: `http://localhost:3000/weather?city=Coimbra&format=html`

### `/compareWeather`

Compare weather between two cities.


- **Parameters**:
  - `city1` (required): Name of the first city.
  - `city2` (required): Name of the second city.
  - `format` (optional): `json` or `html`. Default is `json`.
- **Example**: 
  - JSON: `http://localhost:3000/compareWeather?city1=Coimbra&city2=Vilnius`
  - HTML: `http://localhost:3000/compareWeather?city1=Coimbra&city2=Vilnius&format=html`

## Public API Information

### WeatherStack API

The WeatherStack API provides real-time weather data, including temperature, humidity, wind speed, and descriptions.

- **Endpoint**: `http://api.weatherstack.com/current`
- **Parameters**:
  - `access_key`: Your unique API key.
  - `query`: The city name.
- **Sample Request**:
    ```
    http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=London
    ```


## Project Structure

- `server.js`: Contains the Express server setup, routes, and functions.
- `package.json` and `package-lock.json`: Manage project dependencies.
- `README.md`: Project information and setup instructions.

## Example Responses


**Comparison JSON Response**:
{
  "city1": { "city": "London", "temperature": 15, "description": "Partly Cloudy", "wind_speed": 12, "humidity": 78 },
  "city2": { "city": "Paris", "temperature": 17, "description": "Sunny", "wind_speed": 10, "humidity": 65 },
  "comparisonResult": "London is colder than Paris by 2.0°C"
}


**Single City JSON Response**:
{
  "city": "London",
  "temperature": 15,
  "description": "Partly Cloudy",
  "wind_speed": 12,
  "humidity": 78
}



