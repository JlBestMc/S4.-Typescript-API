import { fetchJoke } from "../api/jokesAPI";
import { updateReport } from "../core/report";

let currentJoke = "";

export async function showJoke(): Promise<void> {
  const jokeElement = document.getElementById("joke");
  currentJoke = await fetchJoke();
  if (jokeElement) {
    jokeElement.textContent = currentJoke;
  }
}

export function setupVoteButtons(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    "#buttons-score button"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const score = parseInt(button.dataset.score || "0");
      if (score >= 1 && score <= 3) {
        updateReport(currentJoke, score);
      }
    });
  });
}
