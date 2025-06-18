import { fetchWeather } from "../api/weatherAPI";

export async function showWeather(): Promise<void> {
  const element = document.getElementById("weather");

  const { temperature, wind, precipitation } = await fetchWeather();

  if (element) {
    element.textContent =
      `🌡️ ${temperature}°C  💨 ${wind} km/h  ☔️ ${precipitation}%`;
  }

}
