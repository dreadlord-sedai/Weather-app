# Weather App

![image](screenshot.png)

## Table of Contents
- [Weather App](#weather-app)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Introduction
The Weather App is a minimalistic web application designed to provide real-time weather information using the OpenWeather API. It aims to deliver current weather conditions and a 5-day forecast for any city worldwide, featuring a responsive design with dark mode support.

## Features
- Real-time weather data from the OpenWeather API
- Current weather conditions and 5-day forecast
- Temperature unit conversion (Celsius/Fahrenheit)
- Save favorite cities for quick access
- Responsive design with dark mode support
- Mock data mode for testing without API calls

## Technologies Used
- **HTML5**: Structure and content of the web pages
- **CSS3**: Styling and layout of the web pages
- **JavaScript**: Logic for fetching and displaying weather data
- **Node.js**: JavaScript runtime for executing build scripts
- **Tailwind CSS**: Utility-first CSS framework for styling
- **SASS**: CSS preprocessor for custom styles

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,tailwind,sass" />
  </a>
</p>

## Installation
To get a local copy up and running, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/[your-username]/weather-app.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd weather-app
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Build the project**:
    ```sh
    npm run build
    ```

5. **Start the development server**:
    ```sh
    npm run serve
    ```

6. **Open the app in your browser**:
    Navigate to `http://localhost:8080` to view the app.

## Usage
- Enter a city name in the search bar to get current weather and forecast
- Toggle between Celsius and Fahrenheit for temperature units
- Save your favorite cities for quick access
- Use the dark mode toggle for a different theme

## Contributing
Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or feedback, feel free to reach out:

- **Your Name**: [your-email@example.com](mailto:dahamifabbio@gmail.com)
- **GitHub**: [your-github-username](https://github.com/dreadlord-sedai)

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

## Configuration
- **API Key**: Replace the placeholder API key in `js/main.js` with your OpenWeather API key.
- **Mock Data**: Set `USE_MOCK_DATA` to `true` in `js/main.js` to use mock data for testing. 