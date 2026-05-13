import Phaser from 'phaser';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super('SettingsScene');
  }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x101828);
    this.add.text(640, 98, 'SETTINGS', pixelTextStyle(52)).setOrigin(0.5);
    this.add.text(640, 235, 'Android tablet landscape mode is optimized by default.', pixelTextStyle(24, '#fff3b0')).setOrigin(0.5);
    this.add.text(640, 305, 'Audio uses generated retro placeholders.', pixelTextStyle(24, '#ffffff')).setOrigin(0.5);
    this.add.text(640, 375, 'Scores are saved locally on this device.', pixelTextStyle(24, '#ffffff')).setOrigin(0.5);
    createButton(this, 640, 560, 'MENU', () => this.scene.start('MainMenuScene'), 260);
  }
}
