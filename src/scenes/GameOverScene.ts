import Phaser from 'phaser';
import { RoundResult } from '../types';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create(result: RoundResult): void {
    this.add.rectangle(640, 360, 1280, 720, 0x101828);
    this.add.sprite(640, 178, 'paci-happy').setScale(3);
    this.add.text(640, 292, 'GAME OVER', pixelTextStyle(58, '#ffffff')).setOrigin(0.5);
    this.add.text(640, 374, `FINAL SCORE ${result.score}`, pixelTextStyle(34, '#fff3b0')).setOrigin(0.5);
    createButton(this, 640, 480, 'RESTART', () => this.scene.start('GameScene'), 300);
    createButton(this, 640, 565, 'MENU', () => this.scene.start('MainMenuScene'), 300);
  }
}
