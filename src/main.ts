import "./ui/style.css";
import { animateText } from "./ui/animations.js";
import { showJoke, setupVoteButtons } from "./ui/uiJokes.ts";
import { showWeather } from "./ui/uiWeather.ts";
import { initThreeViewer } from "./ui/weather3D.ts";

document.addEventListener("DOMContentLoaded", () => {
  animateText();
  setupVoteButtons();
  showWeather();
  initThreeViewer();
});

document.addEventListener("DOMContentLoaded", () => {
  showJoke();
  const button = document.getElementById("next-joke");
  button?.addEventListener("click", () => {
    showJoke();
  });
});
