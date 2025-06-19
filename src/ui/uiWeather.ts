import { fetchWeather } from "../api/weatherAPI";
import { loadModel } from "./weather3D";

export async function showWeather(): Promise<void> {
  const element = document.getElementById("weather");

  const { temperature, wind, precipitation, weathercode, is_day } = await fetchWeather();

  if (element) {
    element.textContent =
      `🌡️ ${temperature}°C  💨 ${wind} km/h  ☔️ ${precipitation}%`;
  }

  if (is_day === 0) {
    loadModel("/luna-draco.glb");
  } else if (weathercode >= 80) {
    loadModel("/lluvia-draco.glb");
  } else if (weathercode >= 1 && weathercode <= 3) {
    loadModel("/nube-draco.glb");
  } else {
    loadModel("/sol-draco.glb");
  }
}
