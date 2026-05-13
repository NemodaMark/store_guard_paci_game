import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config/gameConfig';
import { CHECKOUT_ZONE, STORE_BOUNDS } from '../config/gameRules';

export class MapSystem {
  readonly obstacles: Phaser.Physics.Arcade.StaticGroup;

  constructor(private readonly scene: Phaser.Scene) {
    this.obstacles = scene.physics.add.staticGroup();
  }

  create(): void {
    const addRect = (x: number, y: number, w: number, h: number, color: number, depth = 1): Phaser.GameObjects.Rectangle => {
      const rect = this.scene.add.rectangle(x, y, w, h, color).setOrigin(0.5).setDepth(depth);
      return rect;
    };

    addRect(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x18243a, 0);
    addRect(STORE_BOUNDS.x + STORE_BOUNDS.width / 2, STORE_BOUNDS.y + STORE_BOUNDS.height / 2, STORE_BOUNDS.width, STORE_BOUNDS.height, 0xf8efc7, 0);

    for (let x = STORE_BOUNDS.x + 24; x < STORE_BOUNDS.x + STORE_BOUNDS.width; x += 48) {
      for (let y = STORE_BOUNDS.y + 28; y < STORE_BOUNDS.y + STORE_BOUNDS.height; y += 48) {
        addRect(x, y, 4, 4, 0xe3cf91, 0);
      }
    }

    this.addObstacle(210, 190, 250, 54, 0xf25f5c, 'FRISS');
    this.addObstacle(210, 305, 250, 54, 0x4ecdc4, 'ITAL');
    this.addObstacle(210, 420, 250, 54, 0xffc857, 'NASI');
    this.addObstacle(535, 190, 260, 54, 0x6a4c93, 'TEJ');
    this.addObstacle(535, 305, 260, 54, 0x2ec4b6, 'ZOLDSEG');
    this.addObstacle(535, 420, 260, 54, 0xff9f1c, 'AKCIO');
    this.addObstacle(840, 190, 220, 54, 0x3a86ff, 'HUTO');
    this.addObstacle(1035, 230, 82, 216, 0x90be6d, 'RAKTAR');

    addRect(CHECKOUT_ZONE.x + CHECKOUT_ZONE.width / 2, CHECKOUT_ZONE.y + CHECKOUT_ZONE.height / 2, CHECKOUT_ZONE.width, CHECKOUT_ZONE.height, 0x9a8c98, 2);
    this.addObstacle(954, 520, 112, 48, 0x2f4858, 'KASSZA');
    this.addObstacle(1100, 520, 78, 48, 0x2f4858, 'KASSZA');

    addRect(STORE_BOUNDS.x + STORE_BOUNDS.width / 2, STORE_BOUNDS.y - 16, STORE_BOUNDS.width, 32, 0x35a7ff, 4);
    this.scene.add.text(84, 48, 'BOLT OR PACI SZUPERMARKET', {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#ffffff'
    }).setDepth(6);
  }

  private addObstacle(x: number, y: number, w: number, h: number, color: number, label: string): void {
    const rect = this.scene.add.rectangle(x, y, w, h, color).setDepth(y - 8);
    this.scene.physics.add.existing(rect, true);
    this.obstacles.add(rect);
    this.scene.add.text(x, y - 10, label, {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5).setDepth(y - 7);

    for (let i = -Math.floor(w / 2) + 20; i < w / 2 - 10; i += 28) {
      this.scene.add.rectangle(x + i, y + 13, 14, 14, 0xffffff, 0.85).setDepth(y - 6);
    }
  }
}
