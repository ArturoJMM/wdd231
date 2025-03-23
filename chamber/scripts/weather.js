// select HTML elements in the document
const weatherIcon = document.querySelector("#weathericon");
const weatherDesc = document.querySelector("#weatherdesc");
const weatherTemp = document.querySelector("#temperature");
const weatherWind = document.querySelector("#windspeed");
const forecastContainer = document.querySelector("#forecast");

let lat = -11.97; // Latitude for Lima
let lon = -77.09; // Longitude for Lima
const apiKey = "9db0d4b2ef9fda17b4d4995b870f3769";

// URLs for current weather and 3-day forecast
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
 
// Function to display current weather data
function displayCurrentWeather(weatherData) {
  const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  const desc = weatherData.weather[0].description;
  const main = weatherData.weather[0].main;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  weatherDesc.textContent = main; 
  weatherTemp.textContent = weatherData.main.temp.toFixed(0);
  weatherWind.textContent = weatherData.wind.speed.toFixed(0);  
}

// Function to display 3-day forecast
function displayForecast(forecastData) {
  // Get only three unique days from the forecast data
  const days = [];
  for (let i = 0; i < forecastData.list.length; i += 15) {
    const item = forecastData.list[i];
    const date = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
    const temp = item.main.temp.toFixed(0); 
    const description = item.weather[0].description.toUpperCase();
    
    // Add the day's forecast to the container
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = 
    `<h4>${date}</h4>
    <p><strong>${temp}°C</strong></p>
    <p>${description}</p>`;

    forecastContainer.appendChild(forecastCard);

    // Stop after 3 days
    if (days.length >= 3) break;
  }
}

// Fetch forecast data
async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      console.error("Error fetching forecast data:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// Call the function to fetch and display forecast data
fetchForecast();

async function apiFetch() {
  try {
    const response = await fetch(currentUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();