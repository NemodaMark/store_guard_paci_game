import Phaser from 'phaser';
import { LeaderboardEntry, LeaderboardManager } from '../managers/LeaderboardManager';
import { RoundResult } from '../types';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class GameOverScene extends Phaser.Scene {
  private readonly leaderboard = new LeaderboardManager();
  private result!: RoundResult;
  private nameValue = '';
  private nameText?: Phaser.GameObjects.Text;
  private layer?: Phaser.GameObjects.Container;

  constructor() {
    super('GameOverScene');
  }

  create(result: RoundResult): void {
    this.result = result;
    this.add.rectangle(640, 360, 1280, 720, 0x101828);
    this.showNameEntry();
  }

  private showNameEntry(): void {
    this.layer?.destroy();
    const items: Phaser.GameObjects.GameObject[] = [];
    items.push(this.add.sprite(210, 150, 'paci-happy').setScale(2.2));
    items.push(this.add.text(640, 72, 'GAME OVER', pixelTextStyle(52, '#ffffff')).setOrigin(0.5));
    items.push(this.add.text(640, 136, `FINAL SCORE ${this.result.score}`, pixelTextStyle(32, '#fff3b0')).setOrigin(0.5));
    items.push(this.add.text(640, 205, 'ENTER NAME', pixelTextStyle(28, '#ffffff')).setOrigin(0.5));
    items.push(this.add.rectangle(640, 265, 330, 58, 0x243b53).setStrokeStyle(4, 0xffffff));
    this.nameText = this.add.text(640, 246, '___', pixelTextStyle(32, '#43b7ff')).setOrigin(0.5, 0);
    items.push(this.nameText);

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach((letter, index) => {
      const x = 308 + (index % 13) * 56;
      const y = 355 + Math.floor(index / 13) * 64;
      items.push(this.createKey(x, y, letter, () => this.addLetter(letter)));
    });

    items.push(this.createKey(452, 515, '<', () => this.backspace(), 82));
    items.push(this.createKey(564, 515, 'SPACE', () => this.addLetter(' '), 132));
    items.push(this.createKey(724, 515, 'SAVE', () => this.saveScore(), 132, 0xffc857));
    items.push(this.createKey(884, 515, 'SKIP', () => this.showLeaderboard(this.leaderboard.getEntries()), 132, 0x6a4c93));
    this.layer = this.add.container(0, 0, items);
  }

  private showLeaderboard(entries: LeaderboardEntry[]): void {
    this.layer?.destroy();
    const items: Phaser.GameObjects.GameObject[] = [];
    items.push(this.add.text(640, 62, 'LEADERBOARD', pixelTextStyle(48, '#ffffff')).setOrigin(0.5));
    items.push(this.add.text(302, 126, 'RANK', pixelTextStyle(20, '#fff3b0')));
    items.push(this.add.text(448, 126, 'NAME', pixelTextStyle(20, '#fff3b0')));
    items.push(this.add.text(650, 126, 'SCORE', pixelTextStyle(20, '#fff3b0')));
    items.push(this.add.text(820, 126, 'DATE', pixelTextStyle(20, '#fff3b0')));

    const rows = entries.length > 0 ? entries : [{ name: 'PACI', score: this.result.score, date: new Date().toLocaleDateString() }];
    rows.slice(0, 10).forEach((entry, index) => {
      const y = 174 + index * 38;
      items.push(this.add.rectangle(640, y + 15, 720, 32, index % 2 === 0 ? 0x1b4965 : 0x243b53, 0.72));
      items.push(this.add.text(315, y, `${index + 1}`, pixelTextStyle(22, '#ffffff')));
      items.push(this.add.text(448, y, entry.name, pixelTextStyle(22, '#ffffff')));
      items.push(this.add.text(660, y, `${entry.score}`, pixelTextStyle(22, '#ffffff')));
      items.push(this.add.text(820, y, entry.date, pixelTextStyle(22, '#ffffff')));
    });

    items.push(createButton(this, 530, 630, 'RESTART', () => this.scene.start('GameScene'), 260));
    items.push(createButton(this, 820, 630, 'MENU', () => this.scene.start('MainMenuScene'), 260));
    this.layer = this.add.container(0, 0, items);
  }

  private createKey(x: number, y: number, label: string, onClick: () => void, width = 46, color = 0x43b7ff): Phaser.GameObjects.Container {
    const bg = this.add.rectangle(0, 0, width, 48, color).setStrokeStyle(3, 0xffffff);
    const text = this.add.text(0, -13, label, pixelTextStyle(label.length > 1 ? 18 : 24, '#ffffff')).setOrigin(0.5, 0);
    const key = this.add.container(x, y, [bg, text]).setSize(width, 48);
    key.setInteractive({ useHandCursor: true });
    key.on('pointerdown', () => {
      this.tweens.add({ targets: key, scale: 0.92, yoyo: true, duration: 70 });
      onClick();
    });
    return key;
  }

  private addLetter(letter: string): void {
    if (this.nameValue.length >= 8) {
      return;
    }

    this.nameValue += letter;
    this.refreshName();
  }

  private backspace(): void {
    this.nameValue = this.nameValue.slice(0, -1);
    this.refreshName();
  }

  private refreshName(): void {
    this.nameText?.setText(this.nameValue.length > 0 ? this.nameValue : '___');
  }

  private saveScore(): void {
    this.showLeaderboard(this.leaderboard.saveScore(this.nameValue, this.result.score));
  }
}
