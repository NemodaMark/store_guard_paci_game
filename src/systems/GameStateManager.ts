import { ROUND_SECONDS } from '../config/gameRules';

export class GameStateManager {
  score = 0;
  remainingSeconds = ROUND_SECONDS;
  paused = false;

  reset(): void {
    this.score = 0;
    this.remainingSeconds = ROUND_SECONDS;
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
