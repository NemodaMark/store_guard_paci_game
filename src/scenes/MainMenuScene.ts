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
    this.add.text(640, 96, 'BOLTOR PACI', pixelTextStyle(72, '#ffffff')).setOrigin(0.5);
    this.add.text(640, 178, 'company demo arcade', pixelTextStyle(26, '#fff3b0')).setOrigin(0.5);

    createButton(this, 640, 292, 'STORY MODE', () => this.scene.start('StoryMapScene'), 320);
    createButton(this, 640, 374, 'ARCADE MODE', () => this.scene.start('ArcadeSettingsScene'), 320);
    createButton(this, 640, 456, 'LEADERBOARD', () => this.scene.start('LeaderboardScene'), 320);
    createButton(this, 640, 538, 'SETTINGS', () => this.scene.start('SettingsScene'), 320);
  }
}
