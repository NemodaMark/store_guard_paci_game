import Phaser from 'phaser';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x1b4965);
    this.add.rectangle(640, 560, 1280, 200, 0xf8efc7);
    for (let i = 0; i < 18; i += 1) {
      this.add.rectangle(80 + i * 70, 520, 42, 70, [0xf25f5c, 0x4ecdc4, 0xffc857, 0x6a4c93][i % 4]).setDepth(1);
    }

    this.add.sprite(350, 350, 'paci-happy').setScale(3);
    this.add.sprite(930, 360, 'monster-run').setScale(2.7);
    this.add.text(640, 118, 'BOLTŐR PACI', pixelTextStyle(72, '#ffffff')).setOrigin(0.5);
    this.add.text(640, 206, 'retro bolti fogocska', pixelTextStyle(26, '#fff3b0')).setOrigin(0.5);

    createButton(this, 640, 345, 'PLAY', () => this.scene.start('TutorialScene'), 280);
    createButton(this, 640, 432, 'TUTORIAL', () => this.scene.start('TutorialScene'), 280);
  }
}
