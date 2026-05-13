import Phaser from 'phaser';
import { NPC_SPEED, STORE_BOUNDS } from '../config/gameRules';
import { randomBetween } from '../utils/random';
import { BaseActor } from './BaseActor';

export class Npc extends BaseActor {
  private pauseUntil = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, texture = 'npc-customer') {
    super(scene, x, y, texture, NPC_SPEED);
    this.pickNewTarget();
  }

  updateWander(time: number): void {
    super.updateActor();

    if (!this.target && time > this.pauseUntil) {
      this.pauseUntil = time + randomBetween(500, 1700);
      this.pickNewTarget();
    }
  }

  protected pickNewTarget(): void {
    this.setMoveTarget(
      randomBetween(STORE_BOUNDS.x + 24, STORE_BOUNDS.x + STORE_BOUNDS.width - 24),
      randomBetween(STORE_BOUNDS.y + 34, STORE_BOUNDS.y + STORE_BOUNDS.height - 24)
    );
  }
}
