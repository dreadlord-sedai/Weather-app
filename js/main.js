// Replace this with your OpenWeather API key
const API_KEY = "dd42f0781c38595c9472a14c4a5a5632";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Explicitly set to FALSE to use the real OpenWeather API
const USE_MOCK_DATA = True; // Set to false to use the real API with API key above
const MOCK_DATA_URL = "data/mockWeather.json";

// Current temperature unit (metric = Celsius, imperial = Fahrenheit)
let currentUnit = "metric";

// DOM elements
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const loadingIndicator = document.getElementById("loadingIndicator");
const weatherData = document.getElementById("weatherData");
const errorMessage = document.getElementById("errorMessage");
const darkModeToggle = document.getElementById("darkModeToggle");
const currentYearElement = document.getElementById("currentYear");
const mockDataBadge = document.getElementById("mockDataBadge");
const metricToggle = document.getElementById("metricToggle");
const imperialToggle = document.getElementById("imperialToggle");
const forecastContainer = document.getElementById("forecastContainer");
const saveCity = document.getElementById("saveCity");
const savedCitiesContainer = document.getElementById("savedCitiesContainer");
const savedCitiesList = document.getElementById("savedCitiesList");

// Weather data elements
const cityNameElement = document.getElementById("cityName");
const dateTimeElement = document.getElementById("dateTime");
const temperatureElement = document.getElementById("temperature");
const feelsLikeElement = document.getElementById("feelsLike");
const weatherIconElement = document.getElementById("weatherIcon");
const weatherDescriptionElement = document.getElementById("weatherDescription");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const pressureElement = document.getElementById("pressure");
const visibilityElement = document.getElementById("visibility");
const sunriseElement = document.getElementById("sunrise");
const sunsetElement = document.getElementById("sunset");
const minTempElement = document.getElementById("minTemp");
const maxTempElement = document.getElementById("maxTemp");

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Initialize dark mode from localStorage
function initDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    darkModeToggle.checked = isDarkMode;
    updateDarkMode(isDarkMode);
}

// Toggle dark mode
function updateDarkMode(isDarkMode) {
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        document.documentElement.classList.add("dark");
    } else {
        document.body.classList.remove("dark-mode");
        document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
}

// Initialize saved cities
function initSavedCities() {
    const savedCities = getSavedCities();
    if (savedCities.length > 0) {
        updateSavedCitiesList();
        savedCitiesContainer.classList.remove("hidden");
    }
}

// Get saved cities from localStorage
function getSavedCities() {
    const cities = localStorage.getItem("savedCities");
    return cities ? JSON.parse(cities) : [];
}

// Save city to localStorage
function saveCityToStorage(cityName) {
    const cities = getSavedCities();
    if (!cities.includes(cityName)) {
        cities.push(cityName);
        localStorage.setItem("savedCities", JSON.stringify(cities));
        updateSavedCitiesList();
        savedCitiesContainer.classList.remove("hidden");
    }
}

// Remove city from localStorage
function removeCityFromStorage(cityName) {
    let cities = getSavedCities();
    cities = cities.filter(city => city !== cityName);
    localStorage.setItem("savedCities", JSON.stringify(cities));
    updateSavedCitiesList();
    if (cities.length === 0) {
        savedCitiesContainer.classList.add("hidden");
    }
}

// Update saved cities list in UI
function updateSavedCitiesList() {
    const cities = getSavedCities();
    savedCitiesList.innerHTML = "";
    
    cities.forEach(city => {
        const cityElement = document.createElement("div");
        cityElement.className = "flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2";
        cityElement.innerHTML = `
            <span class="mr-2">${city}</span>
            <button class="text-gray-500 hover:text-red-500" data-city="${city}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        
        // Add click event to load the city
        cityElement.addEventListener("click", (e) => {
            // Ignore clicks on the remove button
            if (e.target.closest('button')) return;
            
            fetchWeatherByCity(city);
        });
        
        // Add click event to remove button
        cityElement.querySelector('button').addEventListener("click", () => {
            removeCityFromStorage(city);
        });
        
        savedCitiesList.appendChild(cityElement);
    });
}

// Event listeners
darkModeToggle.addEventListener("change", () => {
    updateDarkMode(darkModeToggle.checked);
});

searchButton.addEventListener("click", fetchWeatherData);

cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchWeatherData();
    }
});

saveCity.addEventListener("click", () => {
    const cityName = cityNameElement.textContent.split(',')[0].trim();
    saveCityToStorage(cityName);
});

// Temperature unit toggle
metricToggle.addEventListener("click", () => {
    if (currentUnit !== "metric") {
        currentUnit = "metric";
        updateUnitDisplay();
        updateTemperatureDisplay();
    }
});

imperialToggle.addEventListener("click", () => {
    if (currentUnit !== "imperial") {
        currentUnit = "imperial";
        updateUnitDisplay();
        updateTemperatureDisplay();
    }
});

// Update temperature unit buttons display
function updateUnitDisplay() {
    if (currentUnit === "metric") {
        metricToggle.classList.remove("bg-gray-100", "dark:bg-gray-700", "text-gray-500", "dark:text-gray-300");
        metricToggle.classList.add("bg-blue-100", "dark:bg-blue-800", "text-blue-800", "dark:text-blue-100");
        
        imperialToggle.classList.remove("bg-blue-100", "dark:bg-blue-800", "text-blue-800", "dark:text-blue-100");
        imperialToggle.classList.add("bg-gray-100", "dark:bg-gray-700", "text-gray-500", "dark:text-gray-300");
    } else {
        imperialToggle.classList.remove("bg-gray-100", "dark:bg-gray-700", "text-gray-500", "dark:text-gray-300");
        imperialToggle.classList.add("bg-blue-100", "dark:bg-blue-800", "text-blue-800", "dark:text-blue-100");
        
        metricToggle.classList.remove("bg-blue-100", "dark:bg-blue-800", "text-blue-800", "dark:text-blue-100");
        metricToggle.classList.add("bg-gray-100", "dark:bg-gray-700", "text-gray-500", "dark:text-gray-300");
    }
}

// Update temperature display based on current unit
function updateTemperatureDisplay() {
    // Get the stored temperature data
    const tempData = weatherData.dataset;
    if (!tempData.temp) return;
    
    const temp = parseFloat(tempData.temp);
    const feelsLike = parseFloat(tempData.feelsLike);
    const min = parseFloat(tempData.tempMin);
    const max = parseFloat(tempData.tempMax);
    
    if (currentUnit === "metric") {
        temperatureElement.textContent = `${Math.round(temp)}°C`;
        feelsLikeElement.textContent = `Feels like: ${Math.round(feelsLike)}°C`;
        minTempElement.textContent = `Min: ${Math.round(min)}°C`;
        maxTempElement.textContent = `Max: ${Math.round(max)}°C`;
    } else {
        const tempF = convertToFahrenheit(temp);
        const feelsLikeF = convertToFahrenheit(feelsLike);
        const minF = convertToFahrenheit(min);
        const maxF = convertToFahrenheit(max);
        
        temperatureElement.textContent = `${Math.round(tempF)}°F`;
        feelsLikeElement.textContent = `Feels like: ${Math.round(feelsLikeF)}°F`;
        minTempElement.textContent = `Min: ${Math.round(minF)}°F`;
        maxTempElement.textContent = `Max: ${Math.round(maxF)}°F`;
    }
    
    // Also update forecast temperatures if available
    updateForecastTemperatures();
}

// Update forecast temperatures
function updateForecastTemperatures() {
    const forecastItems = forecastContainer.querySelectorAll('.forecast-item');
    forecastItems.forEach(item => {
        const temp = parseFloat(item.dataset.temp);
        const tempElement = item.querySelector('.forecast-temp');
        
        if (currentUnit === "metric") {
            tempElement.textContent = `${Math.round(temp)}°C`;
        } else {
            const tempF = convertToFahrenheit(temp);
            tempElement.textContent = `${Math.round(tempF)}°F`;
        }
    });
}

// Convert Celsius to Fahrenheit
function convertToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Try to get user's location on page load
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initSavedCities();
    
    // Explicitly ensure mock data badge is hidden when using real API
    if (USE_MOCK_DATA) {
        mockDataBadge.classList.remove("hidden");
    } else {
        mockDataBadge.classList.add("hidden");
        console.log("Using real OpenWeather API data - mock data is disabled");
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
                // Default to a city if geolocation fails
                fetchWeatherByCity("New York");
            }
        );
    } else {
        // Geolocation not supported, default to a city
        fetchWeatherByCity("New York");
    }
});

// Fetch weather data by city name
async function fetchWeatherData() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a city name");
        return;
    }
    
    fetchWeatherByCity(city);
}

// Fetch weather by city name
async function fetchWeatherByCity(city) {
    showLoading();
    
    if (USE_MOCK_DATA) {
        try {
            const response = await fetch(MOCK_DATA_URL);
            const mockData = await response.json();
            
            // Try to find the city in our mock data (case insensitive)
            const cityLower = city.toLowerCase();
            let data;
            
            if (mockData.cities[cityLower]) {
                data = mockData.cities[cityLower];
            } else {
                // If city not found in mock data, use default data
                data = mockData.cities.default;
                // But update the name to reflect the search
                data.name = city.charAt(0).toUpperCase() + city.slice(1);
            }
            
            // Add slight random variation to make it feel dynamic
            data.main.temp += (Math.random() * 4 - 2); // +/- 2 degrees
            data.main.humidity += Math.floor(Math.random() * 10 - 5); // +/- 5%
            
            // Make sure values stay in reasonable ranges
            data.main.temp = Math.round(data.main.temp * 10) / 10;
            data.main.humidity = Math.max(30, Math.min(95, data.main.humidity));
            
            displayWeatherData(data);
            
            // Mock forecast data
            const forecastData = {
                list: Array(40).fill(0).map((_, index) => ({
                    dt: data.dt + 3600 * 3 * (index + 1),
                    main: {
                        temp: data.main.temp + Math.random() * 6 - 3,
                        humidity: data.main.humidity + Math.floor(Math.random() * 20 - 10)
                    },
                    weather: [data.weather[0]],
                    dt_txt: new Date(data.dt * 1000 + 3600 * 3 * (index + 1) * 1000).toISOString()
                }))
            };
            
            displayForecastData(forecastData);
        } catch (error) {
            console.error("Error fetching mock data:", error);
            showError("Error loading mock data. Please check if the data file exists.");
        }
        return;
    }
    
    // Real API call (original code)
    try {
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        
        // Check for API key related errors
        if (data.cod === 401 || (typeof data.cod === 'string' && data.cod.startsWith('4'))) {
            console.error("API Key issue:", data.message);
            showError(`API Key error: ${data.message}. Your key might still be in the activation process (takes 2-24 hours).`);
            return;
        }
        
        if (!response.ok) {
            showError(data.message || "City not found. Please try again.");
            return;
        }
        
        displayWeatherData(data);
        
        // Fetch 5-day forecast
        try {
            const forecastResponse = await fetch(`${FORECAST_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
            const forecastData = await forecastResponse.json();
            
            if (forecastResponse.ok) {
                displayForecastData(forecastData);
            }
        } catch (error) {
            console.error("Error fetching forecast:", error);
            // Just log the error but don't show to user since we have the current weather
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            showError("Network error. This could be due to CORS restrictions when running locally. Try using a local server or CORS browser extension.");
        } else {
            showError("Failed to fetch weather data. Please try again later.");
        }
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
    showLoading();
    
    if (USE_MOCK_DATA) {
        try {
            const response = await fetch(MOCK_DATA_URL);
            const mockData = await response.json();
            
            // Use the default coordinates data
            let data = mockData.coordinates.default;
            
            // Add slight random variation to make it feel dynamic
            data.main.temp += (Math.random() * 4 - 2); // +/- 2 degrees
            data.main.humidity += Math.floor(Math.random() * 10 - 5); // +/- 5%
            
            // Make sure values stay in reasonable ranges
            data.main.temp = Math.round(data.main.temp * 10) / 10;
            data.main.humidity = Math.max(30, Math.min(95, data.main.humidity));
            
            displayWeatherData(data);
            
            // Mock forecast data
            const forecastData = {
                list: Array(40).fill(0).map((_, index) => ({
                    dt: data.dt + 3600 * 3 * (index + 1),
                    main: {
                        temp: data.main.temp + Math.random() * 6 - 3,
                        humidity: data.main.humidity + Math.floor(Math.random() * 20 - 10)
                    },
                    weather: [data.weather[0]],
                    dt_txt: new Date(data.dt * 1000 + 3600 * 3 * (index + 1) * 1000).toISOString()
                }))
            };
            
            displayForecastData(forecastData);
        } catch (error) {
            console.error("Error fetching mock data:", error);
            showError("Error loading mock data. Please check if the data file exists.");
        }
        return;
    }
    
    // Real API call
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        
        // Check for API key related errors
        if (data.cod === 401 || (typeof data.cod === 'string' && data.cod.startsWith('4'))) {
            console.error("API Key issue:", data.message);
            showError(`API Key error: ${data.message}. Your key might still be in the activation process (takes 2-24 hours).`);
            return;
        }
        
        if (!response.ok) {
            showError(data.message || "Location not found. Please try again.");
            return;
        }
        
        displayWeatherData(data);
        
        // Fetch 5-day forecast
        try {
            const forecastResponse = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
            const forecastData = await forecastResponse.json();
            
            if (forecastResponse.ok) {
                displayForecastData(forecastData);
            }
        } catch (error) {
            console.error("Error fetching forecast:", error);
            // Just log the error but don't show to user since we have the current weather
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            showError("Network error. This could be due to CORS restrictions when running locally. Try using a local server or CORS browser extension.");
        } else {
            showError("Failed to fetch weather data. Please try again later.");
        }
    }
}

// Process weather API response
async function processWeatherResponse(response, data = null) {
    if (!data) {
        try {
            data = await response.json();
        } catch (error) {
            showError("Error parsing response data");
            return;
        }
    }
    
    if (response.ok) {
        displayWeatherData(data);
    } else {
        showError(data.message || "City not found. Please try again.");
    }
}

// Display weather data
function displayWeatherData(data) {
    // Hide loading indicator and error message
    loadingIndicator.classList.add("hidden");
    errorMessage.classList.add("hidden");
    
    // Store temperature data for unit conversion
    weatherData.dataset.temp = data.main.temp;
    weatherData.dataset.feelsLike = data.main.feels_like;
    weatherData.dataset.tempMin = data.main.temp_min;
    weatherData.dataset.tempMax = data.main.temp_max;
    
    // Update weather data
    cityNameElement.textContent = `${data.name}, ${data.sys.country}`;
    
    // Format and display date
    const date = new Date();
    dateTimeElement.textContent = date.toLocaleDateString("en-US", { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Display temperature based on current unit
    if (currentUnit === "metric") {
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        feelsLikeElement.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        minTempElement.textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
        maxTempElement.textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
    } else {
        const tempF = convertToFahrenheit(data.main.temp);
        const feelsLikeF = convertToFahrenheit(data.main.feels_like);
        const minF = convertToFahrenheit(data.main.temp_min);
        const maxF = convertToFahrenheit(data.main.temp_max);
        
        temperatureElement.textContent = `${Math.round(tempF)}°F`;
        feelsLikeElement.textContent = `Feels like: ${Math.round(feelsLikeF)}°F`;
        minTempElement.textContent = `Min: ${Math.round(minF)}°F`;
        maxTempElement.textContent = `Max: ${Math.round(maxF)}°F`;
    }
    
    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}" class="w-16 h-16">`;
    
    // Weather description
    weatherDescriptionElement.textContent = data.weather[0].description;
    
    // Additional weather details
    humidityElement.textContent = `${data.main.humidity}%`;
    
    // Wind speed (convert to km/h if in metric, otherwise show in mph)
    if (currentUnit === "metric") {
        windElement.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    } else {
        windElement.textContent = `${(data.wind.speed * 2.237).toFixed(1)} mph`;
    }
    
    pressureElement.textContent = `${data.main.pressure} hPa`;
    visibilityElement.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    
    // Sunrise and sunset times
    sunriseElement.textContent = formatTime(data.sys.sunrise, data.timezone);
    sunsetElement.textContent = formatTime(data.sys.sunset, data.timezone);
    
    // Show weather data
    weatherData.classList.remove("hidden");
}

// Display 5-day forecast data
function displayForecastData(data) {
    forecastContainer.innerHTML = "";
    
    // Group forecast data by day
    const dailyForecasts = groupForecastByDay(data.list);
    
    // Display only one forecast per day (around noon) for 5 days
    Object.values(dailyForecasts).slice(0, 5).forEach(dayForecasts => {
        // Use forecast around mid-day (closest to 12:00)
        const midDayForecast = dayForecasts.reduce((closest, forecast) => {
            const forecastHour = new Date(forecast.dt * 1000).getHours();
            const closestHour = new Date(closest.dt * 1000).getHours();
            return Math.abs(forecastHour - 12) < Math.abs(closestHour - 12) ? forecast : closest;
        }, dayForecasts[0]);
        
        const date = new Date(midDayForecast.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: 'short' });
        const dayDate = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' });
        const temp = midDayForecast.main.temp;
        const iconCode = midDayForecast.weather[0].icon;
        const description = midDayForecast.weather[0].description;
        
        const forecastItem = document.createElement("div");
        forecastItem.className = "forecast-item bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow";
        forecastItem.dataset.temp = temp;
        
        forecastItem.innerHTML = `
            <p class="font-medium text-gray-800 dark:text-white">${dayName}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">${dayDate}</p>
            <div class="flex justify-center my-2">
                <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" class="w-12 h-12">
            </div>
            <p class="forecast-temp text-lg font-semibold text-gray-800 dark:text-white">${currentUnit === "metric" ? Math.round(temp) + "°C" : Math.round(convertToFahrenheit(temp)) + "°F"}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">${description}</p>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

// Group forecast data by day
function groupForecastByDay(forecastList) {
    const grouped = {};
    
    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString();
        
        if (!grouped[day]) {
            grouped[day] = [];
        }
        
        grouped[day].push(forecast);
    });
    
    return grouped;
}

// Format time with timezone offset
function formatTime(timestamp, timezone) {
    // Create date in UTC, then apply the timezone offset from the API
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(17, 22);
}

// Show loading indicator
function showLoading() {
    weatherData.classList.add("hidden");
    errorMessage.classList.add("hidden");
    loadingIndicator.classList.remove("hidden");
}

// Show error message
function showError(message) {
    loadingIndicator.classList.add("hidden");
    weatherData.classList.add("hidden");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

// Helper function to format date
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
