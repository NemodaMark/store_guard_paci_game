export function choose<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
