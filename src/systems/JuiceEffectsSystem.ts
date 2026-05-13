import Phaser from 'phaser';
import { Monster } from '../entities/Monster';
import { Player } from '../entities/Player';
import { pixelTextStyle } from '../utils/pixelText';

export class JuiceEffectsSystem {
  constructor(private readonly scene: Phaser.Scene) {}

  catchBurst(player: Player, monster: Monster, points: number, combo: number): void {
    this.scene.cameras.main.shake(120, monster.isGolden ? 0.008 : 0.004);
    this.scene.cameras.main.zoomTo(1.025, 80, 'Quad.easeOut', true, (_camera, progress) => {
      if (progress === 1) {
        this.scene.cameras.main.zoomTo(1, 160);
      }
    });

    const flash = this.scene.add.rectangle(640, 360, 1280, 720, monster.isGolden ? 0xffd166 : 0x9ee7ff, 0.15).setDepth(2500);
    this.scene.tweens.add({ targets: flash, alpha: 0, duration: 140, onComplete: () => flash.destroy() });

    for (let i = 0; i < 18; i += 1) {
      const particle = this.scene.add.rectangle(monster.x, monster.y, 7, 7, monster.isGolden ? 0xffd166 : 0xffffff).setDepth(2200);
      this.scene.tweens.add({
        targets: particle,
        x: monster.x + Phaser.Math.Between(-76, 76),
        y: monster.y + Phaser.Math.Between(-70, 52),
        alpha: 0,
        scale: 0.2,
        duration: 420,
        ease: 'Quad.Out',
        onComplete: () => particle.destroy()
      });
    }

    this.floatText(monster.x, monster.y - 70, `+${points}`, monster.isGolden ? '#ffd166' : '#ffffff', 34);
    if (combo > 1) {
      this.floatText(player.x, player.y - 78, `COMBO x${Math.min(4, combo)}`, '#ff5b5b', 26);
    }
  }

  goldenPopup(x: number, y: number): void {
    this.floatText(x, y - 100, 'GOLDEN THIEF!', '#ffd166', 28);
  }

  private floatText(x: number, y: number, value: string, color: string, size: number): void {
    const text = this.scene.add.text(x, y, value, pixelTextStyle(size, color)).setOrigin(0.5).setDepth(2300);
    this.scene.tweens.add({
      targets: text,
      y: y - 48,
      scale: { from: 0.85, to: 1.2 },
      alpha: 0,
      duration: 850,
      ease: 'Quad.Out',
      onComplete: () => text.destroy()
    });
  }
}
