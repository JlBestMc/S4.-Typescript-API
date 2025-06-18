export async function fetchWeather(): Promise<{
  temperature: number;
  wind: number;
  precipitation: number;
}> {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?" +
      "latitude=41.39&longitude=2.15" +
      "&current_weather=true" +
      "&hourly=precipitation_probability"
    );

    const data = await response.json();

    const temperature = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const precipitation = data.hourly.precipitation_probability[0];

    return { temperature, wind, precipitation };
  } catch (error) {
    console.error("Error carregant el temps:", error);
    return { temperature: 0, wind: 0, precipitation: 0 };
  }
}

