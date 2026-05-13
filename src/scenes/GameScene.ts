import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config/gameConfig';
import { STORE_BOUNDS } from '../config/gameRules';
import { Monster } from '../entities/Monster';
import { Npc } from '../entities/Npc';
import { Player } from '../entities/Player';
import { AudioSystem } from '../systems/AudioSystem';
import { CollisionSystem } from '../systems/CollisionSystem';
import { FraudEventManager } from '../systems/FraudEventManager';
import { GameStateManager } from '../systems/GameStateManager';
import { MapSystem } from '../systems/MapSystem';
import { ScoringSystem } from '../systems/ScoringSystem';
import { TimerSystem } from '../systems/TimerSystem';
import { TouchControlSystem } from '../systems/TouchControlSystem';
import { FraudEvent, FraudType } from '../types';
import { Hud } from '../ui/Hud';
import { randomBetween } from '../utils/random';
import { pixelTextStyle } from '../utils/pixelText';

export class GameScene extends Phaser.Scene {
  private state = new GameStateManager();
  private timer!: TimerSystem;
  private scoring!: ScoringSystem;
  private audio!: AudioSystem;
  private map!: MapSystem;
  private hud!: Hud;
  private player!: Player;
  private controls!: TouchControlSystem;
  private eventManager!: FraudEventManager;
  private npcs: Npc[] = [];
  private monsters: Monster[] = [];
  private pausedOverlay?: Phaser.GameObjects.Container;

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.state.reset();
    this.timer = new TimerSystem(this);
    this.scoring = new ScoringSystem(this.state);
    this.audio = new AudioSystem(this);
    this.audio.create();
    this.audio.playMusic();

    this.physics.world.setBounds(STORE_BOUNDS.x, STORE_BOUNDS.y, STORE_BOUNDS.width, STORE_BOUNDS.height);
    this.map = new MapSystem(this);
    this.map.create();

    this.player = new Player(this, 120, 590);
    this.createCrowd();

    this.hud = new Hud(this, this.state, () => this.togglePause());
    this.hud.create();
    this.hud.refresh();

    this.controls = new TouchControlSystem(this, this.player);
    this.controls.create();

    const collision = new CollisionSystem(this);
    collision.addWorldColliders(this.player, this.npcs, this.monsters, this.map.obstacles);
    collision.addCatchOverlap(this.player, this.monsters, (monster) => this.catchMonster(monster));

    this.eventManager = new FraudEventManager(this, this.monsters, (monster, event) => this.showFraudAlert(monster, event));
    this.eventManager.start();

    this.timer.start(() => {
      if (this.state.tickSecond()) {
        this.endRound();
      }
      this.hud.refresh();
    });
  }

  update(time: number): void {
    if (this.state.paused) {
      return;
    }

    this.controls.update();
    this.player.updateActor();
    this.npcs.forEach((npc) => npc.updateWander(time));
    this.monsters.forEach((monster) => monster.updateMonster(time));
  }

  private createCrowd(): void {
    for (let i = 0; i < 9; i += 1) {
      this.npcs.push(
        new Npc(
          this,
          randomBetween(STORE_BOUNDS.x + 80, STORE_BOUNDS.x + STORE_BOUNDS.width - 120),
          randomBetween(STORE_BOUNDS.y + 90, STORE_BOUNDS.y + STORE_BOUNDS.height - 80),
          i % 4 === 0 ? 'npc-employee' : 'npc-customer'
        )
      );
    }

    for (let i = 0; i < 5; i += 1) {
      this.monsters.push(
        new Monster(
          this,
          randomBetween(STORE_BOUNDS.x + 100, STORE_BOUNDS.x + STORE_BOUNDS.width - 130),
          randomBetween(STORE_BOUNDS.y + 95, STORE_BOUNDS.y + STORE_BOUNDS.height - 85)
        )
      );
    }
  }

  private showFraudAlert(monster: Monster, event: FraudEvent): void {
    this.audio.play('alert');
    this.hud.showAlert(monster.x, monster.y, event.title, event.icon);

    if (event.type === FraudType.CashTheft) {
      const flash = this.add.rectangle(1018, 520, 250, 72, 0xfff3b0, 0.75).setDepth(1200);
      this.tweens.add({ targets: flash, alpha: 0, duration: 420, repeat: 3, onComplete: () => flash.destroy() });
    }

    const icon = this.add.text(monster.x - 14, monster.y - 96, event.icon, pixelTextStyle(42, '#ff3b30')).setDepth(1801);
    this.tweens.add({
      targets: icon,
      y: icon.y - 36,
      alpha: 0,
      duration: 900,
      onComplete: () => icon.destroy()
    });
  }

  private catchMonster(monster: Monster): void {
    monster.caught();
    this.audio.play('catch');
    this.audio.play('score');
    this.scoring.captureMonster();
    this.hud.refresh();
    this.player.playCatchFeedback();

    const bubble = this.add.circle(monster.x, monster.y, 14, 0x9ee7ff, 0.35).setStrokeStyle(4, 0xffffff).setDepth(1900);
    this.tweens.add({
      targets: bubble,
      radius: 54,
      alpha: 0,
      duration: 360,
      onComplete: () => bubble.destroy()
    });
    this.tweens.add({
      targets: monster,
      alpha: 0,
      scale: 0.35,
      duration: 420,
      onComplete: () => {
        monster.setScale(1);
        monster.resetBlendIn(randomBetween(120, GAME_WIDTH - 160), randomBetween(130, GAME_HEIGHT - 120));
        this.eventManager.completeCurrent();
      }
    });
  }

  private togglePause(): void {
    this.state.paused = !this.state.paused;
    this.physics.world.isPaused = this.state.paused;

    if (!this.state.paused) {
      this.pausedOverlay?.destroy();
      this.pausedOverlay = undefined;
      return;
    }

    const shade = this.add.rectangle(640, 360, 1280, 720, 0x101828, 0.62);
    const panel = this.add.rectangle(640, 360, 380, 160, 0x243b53).setStrokeStyle(4, 0xffffff);
    const text = this.add.text(640, 332, 'PAUSED', pixelTextStyle(36)).setOrigin(0.5);
    const hint = this.add.text(640, 392, 'tap pause to continue', pixelTextStyle(20, '#fff3b0')).setOrigin(0.5);
    this.pausedOverlay = this.add.container(0, 0, [shade, panel, text, hint]).setDepth(3000);
  }

  private endRound(): void {
    this.audio.stopMusic();
    this.timer.stop();
    this.eventManager.stop();
    this.scene.start('GameOverScene', { score: this.state.score });
  }
}
