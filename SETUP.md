# Weather App Setup Instructions

Follow these steps to get the Weather App up and running on your local machine:

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.0 or higher)
- npm (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- An API key from OpenWeather

## Step 1: Get an OpenWeather API Key

1. Visit [OpenWeather](https://openweathermap.org/) and create an account (if you don't have one)
2. Navigate to the API Keys section in your account dashboard
3. Generate a new API key (it may take a few hours to activate)

## Step 2: Install Dependencies

Run the following command in the project directory:

```
npm install
```

This will install all the required dependencies including Tailwind CSS, SASS, PostCSS, and others.

## Step 3: Add Your API Key

Open the file `js/main.js` and replace the placeholder with your actual API key:

```javascript
const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your actual API key
```

## Step 4: Compile CSS

Run the following command to compile both Tailwind CSS and SASS:

```
npm run build
```

This will:
1. Process the Tailwind CSS file (styles/tailwind.css → dist/tailwind.css)
2. Compile the SASS file (styles/main.scss → dist/main.css)

For development with automatic recompilation when files change, run:

```
npm run dev
```

## Step 5: Open the Application

Open the `index.html` file in your web browser. You can do this by:

- Double-clicking the file in your file explorer
- Using a local development server if you have one
- Using the "Open with" option and selecting your browser

## Troubleshooting

- **API Key Issues**: If weather data doesn't load, make sure your API key is active and correctly added to the code
- **CORS Issues**: If you encounter CORS errors, consider using a browser extension to disable CORS for local development
- **Styling Issues**: If styles aren't applying, make sure both CSS files were correctly compiled to the `dist` folder
- **Compilation Errors**: If you get SASS compilation errors, make sure you're not trying to import Tailwind directly in SASS

## Additional Configuration

- To change the default city, modify the `fetchWeatherByCity("New York")` line in `js/main.js`
- To customize colors and fonts, edit the `tailwind.config.js` file
- For advanced styling, modify the `styles/main.scss` file 