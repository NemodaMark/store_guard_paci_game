export class TimerSystem {
  private event?: Phaser.Time.TimerEvent;

  constructor(private readonly scene: Phaser.Scene) {}

  start(onTick: () => void): void {
    this.stop();
    this.event = this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: onTick
    });
  }

  stop(): void {
    this.event?.remove(false);
    this.event = undefined;
  }
}
