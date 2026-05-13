import Phaser from 'phaser';
import { CHECKOUT_ZONE, FRAUD_EVENT_DELAY } from '../config/gameRules';
import { Monster } from '../entities/Monster';
import { DifficultyLevel } from '../managers/DifficultyManager';
import { FraudEvent, FraudType, MonsterState } from '../types';
import { choose, randomBetween } from '../utils/random';

export class FraudEventManager {
  private timer?: Phaser.Time.TimerEvent;
  private readonly active = new Set<Monster>();
  private readonly events: FraudEvent[] = [
    { type: FraudType.Shoplifting, title: 'LOPAS!', icon: '!' },
    { type: FraudType.CashTheft, title: 'KASSZA!', icon: '$' },
    { type: FraudType.ProductSwap, title: 'CSERE!', icon: '?' }
  ];

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly monsters: Monster[],
    private readonly getDifficulty: () => DifficultyLevel,
    private readonly onAlert: (monster: Monster, event: FraudEvent) => void,
    private readonly onEscape: (monster: Monster) => void,
    private readonly onCandidateSelected: (monster: Monster) => void
  ) {}

  start(): void {
    this.scheduleNext();
  }

  stop(): void {
    this.timer?.remove(false);
    this.timer = undefined;
  }

  getEscapingMonsters(): Monster[] {
    return [...this.active].filter((monster) => monster.state === MonsterState.ESCAPE);
  }

  completeCurrent(monster: Monster): void {
    this.active.delete(monster);
    this.scheduleNext(650);
  }

  private scheduleNext(delay = randomBetween(FRAUD_EVENT_DELAY.min, FRAUD_EVENT_DELAY.max)): void {
    this.stop();
    const difficulty = this.getDifficulty();
    this.timer = this.scene.time.delayedCall(delay * difficulty.eventDelayMultiplier, () => this.triggerEvent());
  }

  private triggerEvent(): void {
    const difficulty = this.getDifficulty();
    if (this.active.size >= difficulty.maxActiveFrauds) {
      this.scheduleNext(500);
      return;
    }

    const available = this.monsters.filter((monster) => monster.state === MonsterState.BLEND_IN || monster.state === MonsterState.IDLE);
    if (available.length === 0) {
      this.scheduleNext(900);
      return;
    }

    const monster = choose(available);
    const event = choose(this.events);
    this.active.add(monster);
    this.onCandidateSelected(monster);

    if (event.type === FraudType.CashTheft) {
      monster.setPosition(CHECKOUT_ZONE.x + CHECKOUT_ZONE.width / 2, CHECKOUT_ZONE.y + 34);
    }

    monster.startSuspicious(event);
    this.onAlert(monster, event);
    this.scene.time.delayedCall(850, () => monster.startFraud());
    this.scene.time.delayedCall(1650, () => {
      monster.startEscape(difficulty.escapeSpeedMultiplier, difficulty.aggressiveEscape);
      this.onEscape(monster);
    });
    this.scheduleNext(randomBetween(900, 1850));
  }
}
