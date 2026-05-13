import Phaser from 'phaser';
import { createArcadeModeConfig, defaultArcadeSettings } from '../modes/ArcadeModeConfig';
import { ArcadeDifficulty, ArcadeSettings, getMaxActiveMonstersForDifficulty } from '../modes/GameModeConfig';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class ArcadeSettingsScene extends Phaser.Scene {
  private settings: ArcadeSettings = { ...defaultArcadeSettings };
  private optionObjects: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super('ArcadeSettingsScene');
  }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x101828);
    this.add.text(640, 72, 'ARCADE SETTINGS', pixelTextStyle(48)).setOrigin(0.5);
    this.renderOptions();
    createButton(this, 490, 635, 'START', () => this.scene.start('GameScene', createArcadeModeConfig(this.settings)), 260);
    createButton(this, 790, 635, 'BACK', () => this.scene.start('MainMenuScene'), 260);
  }

  private renderOptions(): void {
    this.optionObjects.forEach((item) => item.destroy());
    this.optionObjects = [];

    this.addOption(250, 165, 'DIFFICULTY', this.settings.difficulty.toUpperCase(), () => this.cycleDifficulty());
    this.addOption(250, 245, 'ROUND TIME', `${this.settings.roundTime}s`, () => this.cycleRoundTime());
    this.addOption(250, 325, 'RANDOM LAYOUT', this.settings.randomLayout ? 'ON' : 'OFF', () => this.toggle('randomLayout'));
    this.addOption(250, 405, 'GOLDEN MONSTER', this.settings.goldenMonsterEnabled ? 'ON' : 'OFF', () => this.toggle('goldenMonsterEnabled'));
    this.addOption(250, 485, 'COMBO SYSTEM', this.settings.comboEnabled ? 'ON' : 'OFF', () => this.toggle('comboEnabled'));
    const maxActive = this.add.text(
      640,
      570,
      `MAX ACTIVE MONSTERS: ${getMaxActiveMonstersForDifficulty(this.settings.difficulty)}`,
      pixelTextStyle(22, '#43b7ff')
    ).setOrigin(0.5);
    this.optionObjects.push(maxActive);
  }

  private addOption(x: number, y: number, label: string, value: string, onClick: () => void): void {
    const title = this.add.text(x, y, label, pixelTextStyle(24, '#fff3b0'));
    const button = createButton(this, x + 520, y + 16, value, () => {
      onClick();
      this.renderOptions();
    }, 260);
    this.optionObjects.push(title, button);
  }

  private cycleDifficulty(): void {
    const values: ArcadeDifficulty[] = ['easy', 'normal', 'hard'];
    this.settings.difficulty = values[(values.indexOf(this.settings.difficulty) + 1) % values.length];
  }

  private cycleRoundTime(): void {
    const values = [60, 120, 180];
    this.settings.roundTime = values[(values.indexOf(this.settings.roundTime) + 1) % values.length];
  }

  private toggle(key: 'randomLayout' | 'goldenMonsterEnabled' | 'comboEnabled'): void {
    this.settings[key] = !this.settings[key];
  }
}
