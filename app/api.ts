export async function getResultsForDate(
  date: string | null
): Promise<string[]> {
  const data = {
    "2024-08-25": ["pippo", "pluto", "paperino"],
    "2024-08-26": ["zio paperone", "topolino"],
    "2024-08-27": ["paperino", "minnie", "qui, quo, qua"],
    "2024-08-28": ["zio paperone", "zio topolino", "zio paperino"],
    "2024-08-29": ["zio paperone", "zio topolino", "zio paperino"],
  };

  const result = data[date as keyof typeof data] ?? [];
  return new Promise((resolve) => setTimeout(() => resolve(result), 3000));
}
