export async function fetchJoke(): Promise<string> {
  const useChuck = Math.random() < 0.5; // 50% de probabilidad

  try {
    if (useChuck) {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      return data.value; // El campo value contiene el chiste
    } else {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      return data.joke; // El campo joke contiene el chiste
    }
  } catch (error) {
    console.error("Error obtenint l'acudit:", error);
    return "No s'ha pogut carregar l'acudit.";
  }
}
