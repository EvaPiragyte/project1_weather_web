# Weather Comparison Service

A web service created to demonstrate the ability to use the WeatherStack API to fetch and compare current weather information between cities. This service was implemented using Node.js and provides responses in both HTML and JSON formats. Users can control the functionality through URL parameters.

## Features

- **Weather Data Fetching**: Retrieve the current temperature, weather description, wind speed, and humidity for a specified city.
- **City Temperature Comparison**: Compare temperatures between two cities to determine which is warmer or colder.
- **Flexible Response Formats**: Supports both JSON and HTML responses for easy integration and visualization.

## Getting Started

### Prerequisites

- **Node.js** - Download and install from [Node.js official website](https://nodejs.org/).
- **WeatherStack API Key** - Sign up at [WeatherStack](https://weatherstack.com/) to get an API key.

### Installation

1. Clone the repository and navigate into it:
   
    git clone <repository-url>
    cd <project1_weather_web>
    

2. Install required dependencies:
    
    npm install
   

3. Set up your WeatherStack API Key:
   - Replace `WEATHERSTACK_API_KEY` in the code with your personal key.
   

4. Start the server:
   
    npm start
    
   Access the service locally at `http://localhost:3000`.

## API Endpoints

### `/weather`

Retrieve current weather data for a specified city.


- **Parameters**:
  - `city` (required): The name of the city.
  - `format` (optional): Response format - `json` or `html`. Defaults to `json`.
- **Example**: 
  - JSON format: `http://localhost:3000/weather?city=Coimbra`
  - HTML format: `http://localhost:3000/weather?city=Coimbra&format=html`

### `/compareWeather`

Compare weather data between two specified cities.

- **Parameters**:
  - `city1` (required): The name of the first city.
  - `city2` (required): The name of the second city.
  - `format` (optional): Response format - `json` or `html`. Defaults to `json`.
- **Example**: 
  - JSON format: `http://localhost:3000/compareWeather?city1=Coimbra&city2=Vilnius`
  - HTML format: `http://localhost:3000/compareWeather?city1=Coimbra&city2=Vilnius&format=html`


### WeatherStack API

The WeatherStack API provides real-time weather data, including temperature, humidity, wind speed, and weather descriptions.

- **Endpoint**: `http://api.weatherstack.com/current`
- **Required Parameters**:
  - `access_key`: Your unique API key.
  - `query`: City name to fetch weather data for.
- **Example Request**:

    http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=London
 

## Project Structure

- `server.js`: Contains the Express server setup, API routes, and core functions to fetch and format weather data.
- `package.json` and `package-lock.json`: Project dependencies and metadata.
- `README.md`: Project overview, setup instructions, and API usage details.

## Example Responses

**Single City JSON Response**:

{
  "city": "London",
  "temperature": 15,
  "description": "Partly Cloudy",
  "wind_speed": 12,
  "humidity": 78
}

**Comparison JSON Response**:

{
  "city1": { "city": "London", "temperature": 15, "description": "Partly Cloudy", "wind_speed": 12, "humidity": 78 },
  "city2": { "city": "Paris", "temperature": 17, "description": "Sunny", "wind_speed": 10, "humidity": 65 },
  "comparisonResult": "London is colder than Paris by 2.0°C"
}
