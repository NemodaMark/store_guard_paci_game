import { GameStateManager } from './GameStateManager';

export class ScoringSystem {
  constructor(private readonly state: GameStateManager) {}

  captureMonster(points: number): number {
    this.state.addScore(points);
    return this.state.score;
  }
}
