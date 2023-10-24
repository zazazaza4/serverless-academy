const axios = require("axios");
const { weatherToken } = require("../consts");

const NUM_FORECAST_ITEMS = 5;

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
    default:
      return "❓";
  }
};

const getWeather = async (city) => {
  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      { params: { q: city, appid: weatherToken, lang: "en", units: "metric" } }
    );

    return data.list.slice(0, NUM_FORECAST_ITEMS);
  } catch (error) {
    throw new Error(`Failed to retrieve weather data: ${error.message}`);
  }
};

const formatWeather = (weatherData) => {
  const formattedData = {
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    icon: getIcon(weatherData.weather[0].icon),
    feel: weatherData.main.feels_like,
    windSpeed: weatherData.wind.speed,
    description: weatherData.weather[0].description,
    date: weatherData.dt_txt,
  };

  return `
       ${formattedData.date}
       ${formattedData.icon}  ${formattedData.description}
       Temperature: ${formattedData.temperature}°C (feels like ${formattedData.feel}°C)
       Humidity: ${formattedData.humidity}%.
       Wind Speed: ${formattedData.windSpeed} m/s`;
};

const getForecast = async (city, interval = 1) => {
  try {
    if (!interval) {
      throw new Error("Invalid interval");
    }

    const list = await getWeather(city);

    const formattedMessages = [`Weather in ${city}`];
    for (let i = 0; i < NUM_FORECAST_ITEMS; i += interval) {
      const weather = list[i];
      formattedMessages.push(formatWeather(weather));
    }

    return formattedMessages.join("\n\n");
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't fetch the weather forecast at the moment.";
  }
};

module.exports = {
  getForecast,
};
