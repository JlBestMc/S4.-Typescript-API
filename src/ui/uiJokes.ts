import { fetchJoke } from "../api/jokesAPI";
import {updateReport} from "../core/report";

export async function showJoke(): Promise<void> {
  const jokeElement = document.getElementById("joke");
  if (jokeElement) {
    jokeElement.textContent = await fetchJoke();
  }
}
