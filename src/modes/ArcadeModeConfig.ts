import { FraudType } from '../types';
import { ArcadeSettings, GameModeConfig, getMaxActiveMonstersForDifficulty } from './GameModeConfig';

export const defaultArcadeSettings: ArcadeSettings = {
  difficulty: 'normal',
  roundTime: 120,
  randomLayout: true,
  goldenMonsterEnabled: true,
  comboEnabled: true
};

export function createArcadeModeConfig(settings: ArcadeSettings = defaultArcadeSettings): GameModeConfig {
  return {
    mode: 'arcade',
    roundTime: settings.roundTime,
    difficulty: settings.difficulty,
    enabledFraudTypes: [FraudType.Shoplifting, FraudType.CashTheft, FraudType.ProductSwap],
    maxActiveMonsters: getMaxActiveMonstersForDifficulty(settings.difficulty),
    randomLayout: settings.randomLayout,
    goldenMonsterEnabled: settings.goldenMonsterEnabled,
    comboEnabled: settings.comboEnabled
  };
}
