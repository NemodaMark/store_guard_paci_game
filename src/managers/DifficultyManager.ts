import { ROUND_SECONDS } from '../config/gameRules';
import { ArcadeDifficulty } from '../modes/GameModeConfig';

export interface DifficultyLevel {
  elapsedSeconds: number;
  maxActiveFrauds: number;
  escapeSpeedMultiplier: number;
  eventDelayMultiplier: number;
  aggressiveEscape: boolean;
  label: string;
}

const levels: DifficultyLevel[] = [
  { elapsedSeconds: 0, maxActiveFrauds: 1, escapeSpeedMultiplier: 0.92, eventDelayMultiplier: 1.15, aggressiveEscape: false, label: 'CALM' },
  { elapsedSeconds: 30, maxActiveFrauds: 2, escapeSpeedMultiplier: 1.05, eventDelayMultiplier: 0.95, aggressiveEscape: false, label: 'BUSY' },
  { elapsedSeconds: 60, maxActiveFrauds: 3, escapeSpeedMultiplier: 1.22, eventDelayMultiplier: 0.78, aggressiveEscape: false, label: 'RUSH' },
  { elapsedSeconds: 90, maxActiveFrauds: 4, escapeSpeedMultiplier: 1.42, eventDelayMultiplier: 0.62, aggressiveEscape: true, label: 'PANIC' }
];

export class DifficultyManager {
  getLevel(remainingSeconds: number, roundSeconds = ROUND_SECONDS, baseDifficulty: ArcadeDifficulty = 'normal', maxActiveOverride?: number): DifficultyLevel {
    const elapsed = roundSeconds - remainingSeconds;
    const level = { ...([...levels].reverse().find((candidate) => elapsed >= candidate.elapsedSeconds) ?? levels[0]) };

    if (baseDifficulty === 'easy') {
      level.escapeSpeedMultiplier *= 0.9;
      level.eventDelayMultiplier *= 1.18;
      level.maxActiveFrauds = Math.max(1, level.maxActiveFrauds - 1);
    }

    if (baseDifficulty === 'hard') {
      level.escapeSpeedMultiplier *= 1.15;
      level.eventDelayMultiplier *= 0.82;
      level.maxActiveFrauds += 1;
    }

    if (maxActiveOverride !== undefined) {
      level.maxActiveFrauds = Math.min(level.maxActiveFrauds, maxActiveOverride);
    }

    return level;
  }
}
