export type Report = {
  joke: string;
  score: number;
  date: string;
};

let reportAcudits: Report[] = [];

export function updateReport(joke: string, score: number): void {
  const existing = reportAcudits.find((r) => r.joke === joke);
  const date = new Date().toISOString();

  if (existing) {
    existing.score = score;
    existing.date = date;
  } else {
    reportAcudits.push({ joke, score, date });
  }

  console.log("reportAcudits:", reportAcudits);
}
