const API_KEY = "d671df3324cc64d02ee1c7b26a19f84c";
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherInfo");

// Function to fetch weather for a given city
async function fetchWeather(city) {
  // show loading message
  weatherResult.innerHTML = `
  <div class="loader"></div>
  <p style="color:#555;">Fetching weather for <strong>${city}</strong>...</p>
`;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Extract useful weather details
    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    // change background dynamically
    setBackground(condition);

    // Build HTML to show the result
    weatherResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"></p>
    <p><strong>🌡️ Temp:</strong> ${temp}°C</p>
    <p><strong>🌥️ Condition:</strong> ${condition} (${description})</p>
    <p><strong>💨 Wind:</strong> ${data.wind.speed} m/s</p>
    <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
}

// Function to fetch weather for a given city
function setBackground(condition) {
  const body = document.body;
  const lower = condition.toLowerCase();

  if (lower.includes("clear")) {
    body.style.background = "linear-gradient(to right, #f9d423, #ff4e50)";
  } else if (lower.includes("rain")) {
    body.style.background = "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)";
  } else if (lower.includes("cloud")) {
    body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } else if (lower.includes("snow")) {
    body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
  } else if (lower.includes("storm")) {
    body.style.background = "linear-gradient(to right, #232526, #414345)";
  } else {
    body.style.background = "linear-gradient(to right, #654ea3, #eaafc8)";
  }

  // smooth transition effect
  body.style.transition = "background 1s ease";
}

// Listen for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Load default city (Delhi) when page starts
window.addEventListener("load", () => {
  fetchWeather("Delhi");
});