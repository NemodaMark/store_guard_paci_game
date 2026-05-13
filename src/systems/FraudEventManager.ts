import Phaser from 'phaser';
import { CHECKOUT_ZONE, FRAUD_EVENT_DELAY } from '../config/gameRules';
import { Monster } from '../entities/Monster';
import { FraudEvent, FraudType, MonsterState } from '../types';
import { choose, randomBetween } from '../utils/random';

export class FraudEventManager {
  private timer?: Phaser.Time.TimerEvent;
  private current?: Monster;
  private readonly events: FraudEvent[] = [
    { type: FraudType.Shoplifting, title: 'LOPAS!', icon: '!' },
    { type: FraudType.CashTheft, title: 'KASSZA!', icon: '$' },
    { type: FraudType.ProductSwap, title: 'CSERE!', icon: '?' }
  ];

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly monsters: Monster[],
    private readonly onAlert: (monster: Monster, event: FraudEvent) => void
  ) {}

  start(): void {
    this.scheduleNext();
  }

  stop(): void {
    this.timer?.remove(false);
    this.timer = undefined;
  }

  getCurrentEscapingMonster(): Monster | undefined {
    return this.current?.state === MonsterState.ESCAPE ? this.current : undefined;
  }

  completeCurrent(): void {
    this.current = undefined;
    this.scheduleNext(1200);
  }

  private scheduleNext(delay = randomBetween(FRAUD_EVENT_DELAY.min, FRAUD_EVENT_DELAY.max)): void {
    this.stop();
    this.timer = this.scene.time.delayedCall(delay, () => this.triggerEvent());
  }

  private triggerEvent(): void {
    const available = this.monsters.filter((monster) => monster.state === MonsterState.BLEND_IN || monster.state === MonsterState.IDLE);
    if (available.length === 0) {
      this.scheduleNext(900);
      return;
    }

    const monster = choose(available);
    const event = choose(this.events);
    this.current = monster;

    if (event.type === FraudType.CashTheft) {
      monster.setPosition(CHECKOUT_ZONE.x + CHECKOUT_ZONE.width / 2, CHECKOUT_ZONE.y + 34);
    }

    monster.startSuspicious(event);
    this.onAlert(monster, event);
    this.scene.time.delayedCall(850, () => monster.startFraud());
    this.scene.time.delayedCall(1650, () => monster.startEscape());
  }
}
