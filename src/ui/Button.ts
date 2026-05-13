import Phaser from 'phaser';
import { pixelTextStyle } from '../utils/pixelText';

export function createButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  onClick: () => void,
  width = 250
): Phaser.GameObjects.Container {
  const bg = scene.add.rectangle(0, 0, width, 62, 0x43b7ff).setStrokeStyle(4, 0xffffff);
  const text = scene.add.text(0, 0, label, pixelTextStyle(26, '#ffffff')).setOrigin(0.5);
  const container = scene.add.container(x, y, [bg, text]).setSize(width, 62).setDepth(1000);

  container.setInteractive({ useHandCursor: true });
  container.on('pointerover', () => bg.setFillStyle(0x77d9ff));
  container.on('pointerout', () => bg.setFillStyle(0x43b7ff));
  container.on('pointerdown', () => {
    scene.tweens.add({ targets: container, scale: 0.94, yoyo: true, duration: 70 });
    onClick();
  });

  return container;
}
