import { PLAYER_RUN_SPEED, PLAYER_SPEED } from '../config/gameRules';
import { BaseActor } from './BaseActor';

export class Player extends BaseActor {
  private running = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'paci-idle', PLAYER_SPEED);
  }

  setRunning(running: boolean): void {
    this.running = running;
    this.speed = running ? PLAYER_RUN_SPEED : PLAYER_SPEED;
    this.setTexture(running ? 'paci-run' : 'paci-idle');
  }

  playCatchFeedback(): void {
    this.setTexture('paci-happy');
    this.scene.tweens.add({
      targets: this,
      scale: { from: 1.25, to: 1 },
      duration: 260,
      ease: 'Back.Out',
      onComplete: () => this.setTexture(this.running ? 'paci-run' : 'paci-idle')
    });
  }

  override updateActor(): void {
    super.updateActor();
    const moving = Math.abs(this.arcadeBody.velocity.x) + Math.abs(this.arcadeBody.velocity.y) > 10;
    if (moving && !this.running) {
      this.setTexture('paci-walk');
    } else if (!moving) {
      this.setTexture('paci-idle');
    }
  }
}
