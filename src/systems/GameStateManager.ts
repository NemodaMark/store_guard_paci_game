export class GameStateManager {
  score = 0;
  remainingSeconds = 120;
  paused = false;

  reset(roundSeconds = 120): void {
    this.score = 0;
    this.remainingSeconds = roundSeconds;
    this.paused = false;
  }

  addScore(amount = 1): void {
    this.score += amount;
  }

  tickSecond(): boolean {
    if (this.paused || this.remainingSeconds <= 0) {
      return this.remainingSeconds <= 0;
    }

    this.remainingSeconds -= 1;
    return this.remainingSeconds <= 0;
  }
}
