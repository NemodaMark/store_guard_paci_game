import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class TouchControlSystem {
  private joystickBase?: Phaser.GameObjects.Arc;
  private joystickKnob?: Phaser.GameObjects.Arc;
  private joystickPointerId?: number;
  private joystickVector = new Phaser.Math.Vector2(0, 0);

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly player: Player
  ) {}

  create(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.x < 220 && pointer.y > 480) {
        this.joystickPointerId = pointer.id;
        this.showJoystick(pointer.x, pointer.y);
        return;
      }

      this.player.setRunning(false);
      this.player.setMoveTarget(pointer.worldX, pointer.worldY);
    });

    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.id !== this.joystickPointerId || !this.joystickBase || !this.joystickKnob) {
        return;
      }

      const dx = pointer.x - this.joystickBase.x;
      const dy = pointer.y - this.joystickBase.y;
      const length = Math.min(58, Math.hypot(dx, dy));
      const angle = Math.atan2(dy, dx);
      this.joystickVector.set(Math.cos(angle), Math.sin(angle)).scale(length / 58);
      this.joystickKnob.setPosition(this.joystickBase.x + Math.cos(angle) * length, this.joystickBase.y + Math.sin(angle) * length);
      this.player.setRunning(length > 42);
    });

    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.id === this.joystickPointerId) {
        this.joystickPointerId = undefined;
        this.joystickVector.set(0, 0);
        this.hideJoystick();
        this.player.setRunning(false);
      }
    });
  }

  update(): void {
    if (this.joystickVector.lengthSq() <= 0) {
      return;
    }

    const targetX = this.player.x + this.joystickVector.x * 90;
    const targetY = this.player.y + this.joystickVector.y * 90;
    this.player.setMoveTarget(targetX, targetY);
  }

  private showJoystick(x: number, y: number): void {
    this.joystickBase = this.scene.add.circle(x, y, 70, 0x162033, 0.55).setScrollFactor(0).setDepth(2000);
    this.joystickKnob = this.scene.add.circle(x, y, 28, 0x9ee7ff, 0.85).setScrollFactor(0).setDepth(2001);
  }

  private hideJoystick(): void {
    this.joystickBase?.destroy();
    this.joystickKnob?.destroy();
    this.joystickBase = undefined;
    this.joystickKnob = undefined;
  }
}
