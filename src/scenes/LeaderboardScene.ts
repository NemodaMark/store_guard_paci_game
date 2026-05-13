import Phaser from 'phaser';
import { LeaderboardManager } from '../leaderboard/LeaderboardManager';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class LeaderboardScene extends Phaser.Scene {
  private readonly leaderboard = new LeaderboardManager();

  constructor() {
    super('LeaderboardScene');
  }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x101828);
    this.add.text(640, 70, 'ARCADE LEADERBOARD', pixelTextStyle(50, '#ffffff')).setOrigin(0.5);
    this.add.text(302, 138, 'RANK', pixelTextStyle(20, '#fff3b0'));
    this.add.text(448, 138, 'NAME', pixelTextStyle(20, '#fff3b0'));
    this.add.text(650, 138, 'SCORE', pixelTextStyle(20, '#fff3b0'));
    this.add.text(820, 138, 'DATE', pixelTextStyle(20, '#fff3b0'));

    const entries = this.leaderboard.getEntries();
    if (entries.length === 0) {
      this.add.text(640, 330, 'NO SCORES YET', pixelTextStyle(28, '#fff3b0')).setOrigin(0.5);
    }

    entries.forEach((entry, index) => {
      const y = 186 + index * 38;
      this.add.rectangle(640, y + 15, 720, 32, index % 2 === 0 ? 0x1b4965 : 0x243b53, 0.72);
      this.add.text(315, y, `${index + 1}`, pixelTextStyle(22, '#ffffff'));
      this.add.text(448, y, entry.name, pixelTextStyle(22, '#ffffff'));
      this.add.text(660, y, `${entry.score}`, pixelTextStyle(22, '#ffffff'));
      this.add.text(820, y, entry.date, pixelTextStyle(22, '#ffffff'));
    });

    createButton(this, 640, 635, 'MENU', () => this.scene.start('MainMenuScene'), 260);
  }
}
