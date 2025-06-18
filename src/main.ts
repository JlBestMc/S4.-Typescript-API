import './ui/style.css'
import { animateText } from './ui/animations.js';
import { showJoke, setupVoteButtons } from "./ui/uiJokes.ts";

document.addEventListener('DOMContentLoaded', () => {
  animateText();
  setupVoteButtons();
});

document.addEventListener("DOMContentLoaded", () => {
  showJoke();
  const button = document.getElementById("next-joke");
  button?.addEventListener("click", () => {
    showJoke();
  });
});
