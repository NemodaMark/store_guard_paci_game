import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config/gameConfig';
import { CHECKOUT_ZONE, STORE_BOUNDS } from '../config/gameRules';
import { LayoutPreset } from '../managers/LayoutManager';
import { pixelTextStyle } from '../utils/pixelText';

export class MapSystem {
  readonly obstacles: Phaser.Physics.Arcade.StaticGroup;

  constructor(private readonly scene: Phaser.Scene) {
    this.obstacles = scene.physics.add.staticGroup();
  }

  create(layout: LayoutPreset): void {
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

    layout.shelves.forEach((shelf) => this.addObstacle(shelf.x, shelf.y, shelf.width, shelf.height, shelf.color, shelf.label));

    addRect(CHECKOUT_ZONE.x + CHECKOUT_ZONE.width / 2, CHECKOUT_ZONE.y + CHECKOUT_ZONE.height / 2, CHECKOUT_ZONE.width, CHECKOUT_ZONE.height, 0x9a8c98, 2);
    layout.checkouts.forEach((checkout) => this.addObstacle(checkout.x, checkout.y, checkout.width, checkout.height, checkout.color, checkout.label));

    addRect(STORE_BOUNDS.x + STORE_BOUNDS.width / 2, STORE_BOUNDS.y - 16, STORE_BOUNDS.width, 32, 0x35a7ff, 4);
    this.scene.add.text(84, 48, 'BOLT OR PACI SZUPERMARKET', {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#ffffff'
    }).setDepth(6);
    this.scene.add.text(920, 48, layout.name.toUpperCase(), pixelTextStyle(18, '#fff3b0')).setDepth(6);
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
