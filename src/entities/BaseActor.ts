import Phaser from 'phaser';

export abstract class BaseActor extends Phaser.Physics.Arcade.Sprite {
  protected target?: Phaser.Math.Vector2;
  protected speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, speed: number) {
    super(scene, x, y, texture);
    this.speed = speed;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setDepth(y);
    this.arcadeBody.setSize(24, 24).setOffset(12, 18);
  }

  setMoveTarget(x: number, y: number): void {
    this.target = new Phaser.Math.Vector2(x, y);
  }

  stopMoving(): void {
    this.target = undefined;
    this.setVelocity(0, 0);
  }

  updateActor(): void {
    this.setDepth(this.y);

    if (!this.target) {
      this.setVelocity(0, 0);
      return;
    }

    const distance = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y);
    if (distance < 8) {
      this.stopMoving();
      return;
    }

    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
    this.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);
    this.setFlipX(this.arcadeBody.velocity.x < -5);
  }

  protected get arcadeBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}
