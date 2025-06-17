export async function fetchJoke(): Promise<string> {
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
