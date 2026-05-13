import Phaser from 'phaser';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class TutorialScene extends Phaser.Scene {
  constructor() {
    super('TutorialScene');
  }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x243b53);
    this.add.text(640, 95, 'PACIT IRANYITOD', pixelTextStyle(48)).setOrigin(0.5);

    const lines = [
      'Tapelj a boltban, hogy Paci odaszaladjon.',
      'A zold szornyek vevonek alcazzak magukat.',
      'Ha felvillan a CATCH jel, tapelj a menekulore.',
      'Gyors elkapasok kombot adnak. Az arany szorny +5 alap pont.',
      '120 masodpercig tart a kor.'
    ];

    lines.forEach((line, index) => {
      this.add.text(640, 190 + index * 58, line, pixelTextStyle(25, '#ffffff')).setOrigin(0.5);
    });

    this.add.sprite(420, 528, 'paci-run').setScale(2.2);
    this.add.text(510, 504, 'TAP TO MOVE', pixelTextStyle(22, '#fff3b0'));
    this.add.sprite(780, 528, 'monster-run').setScale(2.2);
    this.add.text(858, 504, 'CATCH!', pixelTextStyle(22, '#ffb3b3'));
    createButton(this, 640, 635, 'START ROUND', () => this.scene.start('GameScene'), 330);
  }
}
