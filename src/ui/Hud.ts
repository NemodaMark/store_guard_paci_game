import Phaser from 'phaser';
import { GameStateManager } from '../systems/GameStateManager';
import { pixelTextStyle } from '../utils/pixelText';

export class Hud {
  private scoreText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private comboText!: Phaser.GameObjects.Text;
  private comboFill!: Phaser.GameObjects.Rectangle;
  private modeText!: Phaser.GameObjects.Text;
  private objectiveText?: Phaser.GameObjects.Text;
  private alertContainer?: Phaser.GameObjects.Container;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly state: GameStateManager,
    private readonly onPause: () => void
  ) {}

  create(modeLabel = 'ARCADE MODE', objectiveLabel?: string): void {
    this.scene.add.rectangle(640, 34, 1240, 56, 0x101828, 0.7).setDepth(1500);
    this.scoreText = this.scene.add.text(34, 15, 'SCORE 0', pixelTextStyle(28)).setDepth(1501);
    this.modeText = this.scene.add.text(248, 19, modeLabel, pixelTextStyle(20, '#43b7ff')).setDepth(1501);
    this.timerText = this.scene.add.text(575, 15, '120', pixelTextStyle(28, '#fff3b0')).setDepth(1501);
    this.comboText = this.scene.add.text(828, 16, 'COMBO x1', pixelTextStyle(22, '#ffffff')).setDepth(1501);
    this.scene.add.rectangle(940, 46, 170, 10, 0x2f4858).setOrigin(0, 0.5).setDepth(1501);
    this.comboFill = this.scene.add.rectangle(940, 46, 0, 10, 0xff5b5b).setOrigin(0, 0.5).setDepth(1502);

    const pause = this.scene.add.rectangle(1194, 34, 56, 42, 0xffc857).setStrokeStyle(3, 0xffffff).setDepth(1501);
    this.scene.add.text(1194, 18, 'II', pixelTextStyle(24, '#162033')).setOrigin(0.5, 0).setDepth(1502);
    pause.setInteractive({ useHandCursor: true }).on('pointerdown', this.onPause);

    if (objectiveLabel) {
      this.objectiveText = this.scene.add.text(34, 72, `MISSION OBJECTIVE: ${objectiveLabel}`, pixelTextStyle(19, '#fff3b0')).setDepth(1501);
    }
  }

  refresh(): void {
    this.scoreText.setText(`SCORE ${this.state.score}`);
    this.timerText.setText(`${this.state.remainingSeconds}`);
    this.timerText.setColor(this.state.remainingSeconds <= 15 ? '#ff5b5b' : '#fff3b0');
    if (this.state.remainingSeconds <= 15 && this.state.remainingSeconds % 2 === 1) {
      this.timerText.setScale(1.12);
    } else {
      this.timerText.setScale(1);
    }
  }

  refreshCombo(combo: number, multiplier: number, ratio: number): void {
    this.comboText.setText(`COMBO x${multiplier}`);
    this.comboText.setColor(combo > 1 ? '#ff5b5b' : '#ffffff');
    this.comboFill.width = 170 * ratio;
  }

  setComboVisible(visible: boolean): void {
    this.comboText.setVisible(visible);
    this.comboFill.setVisible(visible);
  }

  refreshObjective(label: string): void {
    this.objectiveText?.setText(`MISSION OBJECTIVE: ${label}`);
  }

  showAlert(x: number, y: number, title: string, icon: string): void {
    this.alertContainer?.destroy();
    const bubble = this.scene.add.rectangle(0, 0, 168, 58, 0xff3b30).setStrokeStyle(4, 0xffffff);
    const iconText = this.scene.add.text(-64, -21, icon, pixelTextStyle(32, '#ffffff'));
    const titleText = this.scene.add.text(-18, -14, title, pixelTextStyle(20, '#ffffff'));
    this.alertContainer = this.scene.add.container(x, y - 70, [bubble, iconText, titleText]).setDepth(1800);
    this.scene.tweens.add({
      targets: this.alertContainer,
      y: y - 92,
      scale: { from: 0.72, to: 1 },
      yoyo: true,
      repeat: 3,
      duration: 180
    });
    this.scene.time.delayedCall(1800, () => this.alertContainer?.destroy());
  }
}
