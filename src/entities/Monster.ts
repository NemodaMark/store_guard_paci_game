import Phaser from 'phaser';
import { MONSTER_ESCAPE_SPEED, NPC_SPEED, STORE_BOUNDS } from '../config/gameRules';
import { FraudEvent, MonsterState } from '../types';
import { randomBetween } from '../utils/random';
import { BaseActor } from './BaseActor';

export class Monster extends BaseActor {
  state = MonsterState.BLEND_IN;
  activeFraud?: FraudEvent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'monster-disguise', NPC_SPEED);
    this.pickNewWanderTarget();
  }

  updateMonster(time: number): void {
    if (this.state === MonsterState.BLEND_IN || this.state === MonsterState.IDLE) {
      super.updateActor();
      if (!this.target && Math.random() < 0.018) {
        this.pickNewWanderTarget();
      }
    } else if (this.state === MonsterState.ESCAPE) {
      super.updateActor();
      if (!this.target) {
        this.pickEscapeTarget();
      }
    }

    this.setDepth(this.y + (this.state === MonsterState.ESCAPE ? 12 : 0));
    if (this.state === MonsterState.SUSPICIOUS && time % 320 < 160) {
      this.setTexture('monster-sus');
    }
  }

  startSuspicious(event: FraudEvent): void {
    this.activeFraud = event;
    this.state = MonsterState.SUSPICIOUS;
    this.stopMoving();
    this.setTexture('monster-sus');
    this.scene.tweens.add({
      targets: this,
      x: this.x + 8,
      yoyo: true,
      repeat: 4,
      duration: 90,
      ease: 'Stepped'
    });
  }

  startFraud(): void {
    this.state = MonsterState.FRAUD;
    this.setTexture('monster-fraud');
    this.scene.tweens.add({
      targets: this,
      angle: { from: -8, to: 8 },
      yoyo: true,
      repeat: 5,
      duration: 75
    });
  }

  startEscape(): void {
    this.state = MonsterState.ESCAPE;
    this.speed = MONSTER_ESCAPE_SPEED;
    this.setTexture('monster-run');
    this.pickEscapeTarget();
  }

  caught(): void {
    this.state = MonsterState.CAUGHT;
    this.stopMoving();
    this.setTexture('monster-caught');
  }

  resetBlendIn(x: number, y: number): void {
    this.setPosition(x, y);
    this.speed = NPC_SPEED;
    this.state = MonsterState.BLEND_IN;
    this.activeFraud = undefined;
    this.setTexture('monster-disguise');
    this.setAlpha(1);
    this.setVisible(true);
    this.pickNewWanderTarget();
  }

  private pickNewWanderTarget(): void {
    this.setMoveTarget(
      randomBetween(STORE_BOUNDS.x + 24, STORE_BOUNDS.x + STORE_BOUNDS.width - 24),
      randomBetween(STORE_BOUNDS.y + 34, STORE_BOUNDS.y + STORE_BOUNDS.height - 24)
    );
  }

  private pickEscapeTarget(): void {
    const edgeX = Math.random() > 0.5 ? STORE_BOUNDS.x + 12 : STORE_BOUNDS.x + STORE_BOUNDS.width - 12;
    this.setMoveTarget(edgeX, randomBetween(STORE_BOUNDS.y + 24, STORE_BOUNDS.y + STORE_BOUNDS.height - 24));
  }
}
