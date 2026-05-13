export interface ComboResult {
  combo: number;
  multiplier: number;
  didIncrease: boolean;
}

export class ComboManager {
  private combo = 0;
  private expiresAt = 0;
  readonly windowMs = 3600;

  registerCatch(time: number): ComboResult {
    const didIncrease = time <= this.expiresAt;
    this.combo = didIncrease ? this.combo + 1 : 1;
    this.expiresAt = time + this.windowMs;
    return {
      combo: this.combo,
      multiplier: this.getMultiplier(),
      didIncrease
    };
  }

  update(time: number): void {
    if (this.combo > 0 && time > this.expiresAt) {
      this.combo = 0;
    }
  }

  getCombo(): number {
    return this.combo;
  }

  getMultiplier(): number {
    return Math.min(4, Math.max(1, this.combo));
  }

  getRemainingRatio(time: number): number {
    if (this.combo <= 0) {
      return 0;
    }

    return Math.max(0, Math.min(1, (this.expiresAt - time) / this.windowMs));
  }
}
