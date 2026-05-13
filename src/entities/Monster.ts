import Phaser from 'phaser';
import { MONSTER_ESCAPE_SPEED, NPC_SPEED, STORE_BOUNDS } from '../config/gameRules';
import { FraudEvent, MonsterState } from '../types';
import { randomBetween } from '../utils/random';
import { BaseActor } from './BaseActor';

export class Monster extends BaseActor {
  state = MonsterState.BLEND_IN;
  activeFraud?: FraudEvent;
  isGolden = false;
  private escapeSpeedMultiplier = 1;
  private aggressiveEscape = false;

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
      this.setTexture(this.isGolden ? 'monster-golden' : 'monster-sus');
    }

    if (this.isGolden && this.visible && time % 260 < 18) {
      const sparkle = this.scene.add.rectangle(this.x + randomBetween(-20, 20), this.y + randomBetween(-24, 14), 5, 5, 0xffffff).setDepth(this.y + 40);
      this.scene.tweens.add({
        targets: sparkle,
        y: sparkle.y - 18,
        alpha: 0,
        duration: 360,
        onComplete: () => sparkle.destroy()
      });
    }
  }

  startSuspicious(event: FraudEvent): void {
    this.activeFraud = event;
    this.state = MonsterState.SUSPICIOUS;
    this.stopMoving();
    this.setTexture(this.isGolden ? 'monster-golden' : 'monster-sus');
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
    this.setTexture(this.isGolden ? 'monster-golden' : 'monster-fraud');
    this.scene.tweens.add({
      targets: this,
      angle: { from: -8, to: 8 },
      yoyo: true,
      repeat: 5,
      duration: 75
    });
  }

  startEscape(escapeSpeedMultiplier = 1, aggressiveEscape = false): void {
    this.state = MonsterState.ESCAPE;
    this.escapeSpeedMultiplier = escapeSpeedMultiplier;
    this.aggressiveEscape = aggressiveEscape;
    this.speed = MONSTER_ESCAPE_SPEED * escapeSpeedMultiplier * (this.isGolden ? 1.38 : 1);
    this.setTexture(this.isGolden ? 'monster-golden' : 'monster-run');
    this.pickEscapeTarget();
  }

  caught(): void {
    this.state = MonsterState.CAUGHT;
    this.stopMoving();
    this.setTexture(this.isGolden ? 'monster-golden-caught' : 'monster-caught');
  }

  resetBlendIn(x: number, y: number): void {
    this.setPosition(x, y);
    this.speed = NPC_SPEED;
    this.state = MonsterState.BLEND_IN;
    this.activeFraud = undefined;
    this.isGolden = false;
    this.escapeSpeedMultiplier = 1;
    this.aggressiveEscape = false;
    this.setTexture('monster-disguise');
    this.setAlpha(1);
    this.setVisible(true);
    this.pickNewWanderTarget();
  }

  makeGolden(): void {
    this.isGolden = true;
    this.setTexture('monster-golden-disguise');
  }

  private pickNewWanderTarget(): void {
    this.setMoveTarget(
      randomBetween(STORE_BOUNDS.x + 24, STORE_BOUNDS.x + STORE_BOUNDS.width - 24),
      randomBetween(STORE_BOUNDS.y + 34, STORE_BOUNDS.y + STORE_BOUNDS.height - 24)
    );
  }

  private pickEscapeTarget(): void {
    const edgeX = Math.random() > 0.5 ? STORE_BOUNDS.x + 12 : STORE_BOUNDS.x + STORE_BOUNDS.width - 12;
    const edgeY = Math.random() > 0.5 ? STORE_BOUNDS.y + 24 : STORE_BOUNDS.y + STORE_BOUNDS.height - 24;
    if (this.aggressiveEscape && Math.random() > 0.45) {
      this.setMoveTarget(edgeX, edgeY);
      return;
    }

    this.setMoveTarget(edgeX, randomBetween(STORE_BOUNDS.y + 24, STORE_BOUNDS.y + STORE_BOUNDS.height - 24));
  }
}
