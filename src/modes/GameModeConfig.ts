import { FraudType } from '../types';
import { StoryMissionObjective } from '../story/StoryMission';

export type GameMode = 'arcade' | 'story';
export type ArcadeDifficulty = 'easy' | 'normal' | 'hard';

export interface GameModeConfig {
  mode: GameMode;
  roundTime: number;
  difficulty: ArcadeDifficulty;
  enabledFraudTypes: FraudType[];
  maxActiveMonsters: number;
  randomLayout: boolean;
  goldenMonsterEnabled: boolean;
  comboEnabled: boolean;
  missionId?: string;
  missionTitle?: string;
  missionObjective?: StoryMissionObjective;
  featureUnlocks?: string[];
}

export interface ArcadeSettings {
  difficulty: ArcadeDifficulty;
  roundTime: number;
  randomLayout: boolean;
  goldenMonsterEnabled: boolean;
  comboEnabled: boolean;
}

export function getMaxActiveMonstersForDifficulty(difficulty: ArcadeDifficulty): number {
  if (difficulty === 'easy') {
    return 2;
  }

  if (difficulty === 'hard') {
    return 4;
  }

  return 3;
}
