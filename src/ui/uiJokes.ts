import { fetchJoke } from "../api/jokesAPI";

export async function showJoke(): Promise<void> {
  const jokeElement = document.getElementById("joke");
  if (jokeElement) {
    jokeElement.textContent = await fetchJoke();
  }
}
