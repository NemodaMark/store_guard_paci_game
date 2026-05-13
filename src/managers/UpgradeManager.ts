export interface PlayerUpgrades {
  movementSpeedLevel: number;
  catchRadiusLevel: number;
  sprintEfficiencyLevel: number;
  radarCooldownLevel: number;
}

export class UpgradeManager {
  private readonly upgrades: PlayerUpgrades = {
    movementSpeedLevel: 0,
    catchRadiusLevel: 0,
    sprintEfficiencyLevel: 0,
    radarCooldownLevel: 0
  };

  getMovementSpeedBonus(): number {
    return this.upgrades.movementSpeedLevel * 0.08;
  }

  getCatchRadiusBonus(): number {
    return this.upgrades.catchRadiusLevel * 10;
  }

  getSprintEfficiencyBonus(): number {
    return this.upgrades.sprintEfficiencyLevel * 0.1;
  }

  getRadarCooldownReduction(): number {
    return this.upgrades.radarCooldownLevel * 0.08;
  }

  getSnapshot(): PlayerUpgrades {
    return { ...this.upgrades };
  }
}
