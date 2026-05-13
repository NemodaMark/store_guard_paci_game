import { GameStateManager } from './GameStateManager';

export class ScoringSystem {
  constructor(private readonly state: GameStateManager) {}

  captureMonster(): number {
    this.state.addScore(1);
    return this.state.score;
  }
}
