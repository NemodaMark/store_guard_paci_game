import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create(): void {
    this.createActorTextures();
    this.scene.start('MainMenuScene');
  }

  private createActorTextures(): void {
    this.makePaci('paci-idle', 0x9ee7ff, 0x43b7ff);
    this.makePaci('paci-walk', 0x9ee7ff, 0x43b7ff, 2);
    this.makePaci('paci-run', 0x8ee8ff, 0x168aad, 5);
    this.makePaci('paci-happy', 0xbef3ff, 0x43b7ff, 0, true);
    this.makeNpc('npc-customer', 0xffd166, 0xef476f);
    this.makeNpc('npc-employee', 0xffffff, 0x118ab2);
    this.makeMonster('monster-disguise', 0xffd166, false);
    this.makeMonster('monster-sus', 0x7bd88f, false);
    this.makeMonster('monster-fraud', 0x4caf50, true);
    this.makeMonster('monster-run', 0x38b000, true);
    this.makeMonster('monster-caught', 0xa7c957, true, true);
  }

  private makePaci(key: string, body: number, shade: number, footOffset = 0, happy = false): void {
    const g = this.add.graphics();
    g.fillStyle(shade);
    g.fillRect(15, 31 + footOffset, 8, 8);
    g.fillRect(41, 31 - footOffset, 8, 8);
    g.fillStyle(body);
    g.fillCircle(32, 28, 22);
    g.fillStyle(0x101828);
    g.fillCircle(24, 23, 4);
    g.fillCircle(40, 23, 4);
    g.fillStyle(0xffffff);
    g.fillCircle(25, 22, 1.5);
    g.fillCircle(41, 22, 1.5);
    if (happy) {
      g.lineStyle(3, 0x101828);
      g.beginPath();
      g.arc(32, 34, 10, 0.1, Math.PI - 0.1);
      g.strokePath();
    } else {
      g.fillRect(28, 36, 8, 3);
    }
    g.fillStyle(shade);
    g.fillCircle(11, 30, 5);
    g.fillCircle(53, 30, 5);
    g.generateTexture(key, 64, 56);
    g.destroy();
  }

  private makeNpc(key: string, head: number, body: number): void {
    const g = this.add.graphics();
    g.fillStyle(body);
    g.fillRect(20, 26, 24, 25);
    g.fillStyle(head);
    g.fillCircle(32, 18, 13);
    g.fillStyle(0x101828);
    g.fillCircle(27, 17, 2);
    g.fillCircle(37, 17, 2);
    g.fillRect(25, 49, 8, 7);
    g.fillRect(35, 49, 8, 7);
    g.generateTexture(key, 64, 60);
    g.destroy();
  }

  private makeMonster(key: string, color: number, revealed: boolean, caught = false): void {
    const g = this.add.graphics();
    if (!revealed) {
      g.fillStyle(0x5f6c7b);
      g.fillRect(20, 25, 24, 28);
      g.fillStyle(color);
      g.fillCircle(32, 18, 13);
    } else {
      g.fillStyle(color);
      g.fillCircle(32, 29, 22);
      g.fillTriangle(17, 15, 23, 4, 29, 15);
      g.fillTriangle(35, 15, 41, 4, 47, 15);
    }
    g.fillStyle(0x101828);
    g.fillCircle(25, 24, 4);
    g.fillCircle(39, 24, 4);
    g.fillStyle(0xffffff);
    g.fillRect(25, 36, 14, caught ? 2 : 6);
    g.fillStyle(0x2d6a4f);
    g.fillRect(18, 49, 9, 8);
    g.fillRect(38, 49, 9, 8);
    g.generateTexture(key, 64, 60);
    g.destroy();
  }
}
