const API_KEY = "d671df3324cc64d02ee1c7b26a19f84c";
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherInfo");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city == "") return;

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
})