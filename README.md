# Weather App

## Overview
The Weather App is a minimalistic web application that provides real-time weather information using the OpenWeather API. It displays the current weather conditions and a 5-day forecast for any city worldwide. The app features a responsive design with dark mode support and allows users to save their favorite cities.

## Features
- Real-time weather data from the OpenWeather API
- Current weather conditions and 5-day forecast
- Temperature unit conversion (Celsius/Fahrenheit)
- Save favorite cities for quick access
- Responsive design with dark mode support
- Mock data mode for testing without API calls

## Technologies Used
- HTML5, CSS3, JavaScript
- Tailwind CSS for utility-first styling
- SASS for custom styles
- OpenWeather API for weather data

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start the development server**
   ```bash
   npm run serve
   ```

5. **Open the app in your browser**
   Navigate to `http://localhost:8080` to view the app.

## Configuration
- **API Key**: Replace the placeholder API key in `js/main.js` with your OpenWeather API key.
- **Mock Data**: Set `USE_MOCK_DATA` to `true` in `js/main.js` to use mock data for testing.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- [OpenWeather API](https://openweathermap.org/api) for providing weather data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [SASS](https://sass-lang.com/) for custom styles

## Project Structure

```
/weather-app
 ├── index.html          # Main HTML file
 ├── js/
 │   ├── main.js         # JavaScript logic
 ├── styles/
 │   ├── main.scss       # SASS styles
 │   ├── tailwind.css    # Tailwind directives
 ├── dist/
 │   ├── main.css        # Compiled SASS
 │   ├── tailwind.css    # Compiled Tailwind
 ├── package.json        # Dependencies and scripts
 ├── tailwind.config.js  # Tailwind configuration
 ├── README.md           # Project documentation
```

## API Usage

This application uses the OpenWeather API to fetch weather data. The free tier allows for up to 1,000 API calls per day.

### Endpoints Used:

- Current Weather Data: `https://api.openweathermap.org/data/2.5/weather`

## Contributing

Contributions, issues, and feature requests are welcome! 