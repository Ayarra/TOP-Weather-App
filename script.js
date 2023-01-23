let API = "6d9bfea8de71d49770bb2ebf911e5807";
let unit = "metric";
let globalData;

// Different form inputs
let button = document.querySelector("button");
let city = document.querySelector("input");
let unitButton = document.querySelector(".units");
let errorTag = document.querySelector(".error");

unitButton.innerHTML = "°C";

// Weather Variables
let locationText = document.querySelector(".location");
let realTemp = document.querySelector(".real-temp");
let feelTemp = document.querySelector(".feel-temp");
let weather = document.querySelector(".weather-description");
let weatherIcon = document.querySelector("img");
let minTemp = document.querySelector(".min-temp");
let maxTemp = document.querySelector(".max-temp");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let wind = document.querySelector(".wind");

function displayData(data) {
  locationText.innerHTML = `${data.name}, ${data.sys.country}`;
  realTemp.innerHTML = `${data.main.temp}°`;
  feelTemp.innerHTML = `Feels like ${data.main.feels_like}°`;
  weather.innerHTML = `${data.weather[0].description}`;
  weatherIcon.src = ` http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  minTemp.innerHTML = `${data.main.temp_min}°`;
  maxTemp.innerHTML = `${data.main.temp_max}°`;
  humidity.innerHTML = `${data.main.humidity}%`;
  pressure.innerHTML = `${data.main.pressure} hPa`;
  wind.innerHTML = `${data.wind.speed} m/sec`;
}

function displayError(arg) {
  if (arg === "no-data") {
    errorTag.style.display = "block";
    errorTag.innerHTML = "Please input a city name";
  } else if (arg === "invalid-data") {
    errorTag.style.display = "block";
    errorTag.innerHTML = "Please input a valid city name";
  } else errorTag.style.display = "none";
}

async function fetchData(location, unit) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${API}&q=${location}&units=${unit}`,
    {
      mode: "cors",
    }
  );
  return response;
}

async function getWeatherData(location = "Meknes") {
  try {
    let response = await Promise.all([
      fetchData(location, "metric"),
      fetchData(location, "imperial"),
    ]);
    globalData = await Promise.all([response[0].json(), response[1].json()]);

    if ((unit = "metric")) displayData(globalData[0]);
    else if ((unit = "imperial")) displayData(data[1]);
  } catch (error) {
    displayError("invalid-data");
  }
}

unitButton.addEventListener("click", (e) => {
  if (e.target.innerHTML === "°C") {
    e.target.innerHTML = "°F";
    unit = "imperial";
    displayData(globalData[1]);
  } else if (e.target.innerHTML === "°F") {
    e.target.innerHTML = "°C";
    unit = "metric";
    displayData(globalData[0]);
  }
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (city.value) {
    getWeatherData(city.value);
    displayError("data");
  } else displayError("no-data");
});

getWeatherData("Meknes");
