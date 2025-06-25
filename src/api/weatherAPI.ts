export async function fetchWeather(): Promise<{
  temperature: number;
  wind: number;
  precipitation: number;
  weathercode: number;
  is_day: number;
}> {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?" +
        "latitude=41.39&longitude=2.15" +
        "&current_weather=true" +
        "&hourly=precipitation_probability"
    );
    //almacenamos la data en un json
    const data = await response.json();

    //declaramos las variables a partir del objeto que tenemos en el json data
    const temperature = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const precipitation = data.hourly.precipitation_probability[0];
    const weathercode = data.current_weather.weathercode;
    const is_day = data.current_weather.is_day;

    return { temperature, wind, precipitation, weathercode, is_day }; //para sacar estos datos fuera de esta función
  } catch (error) {
    console.error("Error carregant el temps:", error);
    return {
      temperature: 0,
      wind: 0,
      precipitation: 0,
      weathercode: 0,
      is_day: 1,
    };
  }
}
