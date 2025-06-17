import './style.css'
import { animateText } from './ui/animations.js'

document.addEventListener('DOMContentLoaded', () => {
  animateText();
});

async function fetchJoke(): Promise<string> {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data.joke;
  } catch (error) {
    console.error("Error al carregar l'acudit:", error);
    return "Hi ha hagut un error carregant l'acudit.";
  }
}

async function showJoke(): Promise<void> {
  const jokeElement = document.getElementById("joke");
  if (jokeElement) {
    jokeElement.textContent = await fetchJoke();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showJoke();

  const button = document.getElementById("next-joke");
  button?.addEventListener("click", () => {
    showJoke();
  });
});
