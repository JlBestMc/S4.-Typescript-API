export type Report = {
  joke: string;
  score: number;
  date: string;
};

let reportAcudits: Report[] = [];

export function updateReport(joke: string, score: number): void {
  const date = new Date().toISOString();
  reportAcudits.push({ joke, score, date });
  console.log("reportAcudits:", reportAcudits);
}