import { fetchWeather } from "../api/weatherAPI";

export async function showWeather(): Promise<void> {
  const element = document.getElementById("weather");

  const { temperature, precipitation } = await fetchWeather();

  if (element) {
    element.textContent =
      `🌡️ ${temperature}°C  ☔️ ${precipitation}%`;
  }

}
