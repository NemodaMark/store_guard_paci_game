export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

const STORAGE_KEY = 'boltor-paci-leaderboard';

export class LeaderboardManager {
  getEntries(): LeaderboardEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const entries = JSON.parse(raw) as LeaderboardEntry[];
      return entries
        .filter((entry) => typeof entry.name === 'string' && typeof entry.score === 'number')
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    } catch {
      return [];
    }
  }

  saveScore(name: string, score: number): LeaderboardEntry[] {
    const cleanName = name.trim().toUpperCase().slice(0, 8) || 'PACI';
    const entry: LeaderboardEntry = {
      name: cleanName,
      score,
      date: new Date().toLocaleDateString()
    };
    const entries = [...this.getEntries(), entry].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return entries;
  }
}
