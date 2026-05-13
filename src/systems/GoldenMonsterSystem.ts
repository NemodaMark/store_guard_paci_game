import { Monster } from '../entities/Monster';

export class GoldenMonsterSystem {
  private nextEligibleAt = 0;

  shouldMakeGolden(time: number): boolean {
    if (time < this.nextEligibleAt) {
      return false;
    }

    const success = Math.random() < 0.16;
    this.nextEligibleAt = time + 12000;
    return success;
  }

  apply(monster: Monster): void {
    monster.makeGolden();
  }
}
