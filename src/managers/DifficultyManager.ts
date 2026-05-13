import { ROUND_SECONDS } from '../config/gameRules';

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
  getLevel(remainingSeconds: number): DifficultyLevel {
    const elapsed = ROUND_SECONDS - remainingSeconds;
    return [...levels].reverse().find((level) => elapsed >= level.elapsedSeconds) ?? levels[0];
  }
}
