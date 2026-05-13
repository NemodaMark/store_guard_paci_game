import { FraudType } from '../types';
import { StoryMissionObjective } from './StoryMission';

export interface ObjectiveCatchEvent {
  fraudType?: FraudType;
  elapsedSeconds: number;
}

export class StoryObjectiveTracker {
  private progress = 0;
  private failed = false;

  constructor(private readonly objective: StoryMissionObjective) {}

  registerCatch(event: ObjectiveCatchEvent): void {
    if (this.objective.type === 'catchTotal') {
      this.progress += 1;
    }

    if (this.objective.type === 'catchFraudType' && event.fraudType === this.objective.fraudType) {
      this.progress += 1;
    }

    if (this.objective.type === 'catchWithinTime' && event.elapsedSeconds <= (this.objective.timeLimitSeconds ?? 999)) {
      this.progress += 1;
    }
  }

  registerEscape(): void {
    if (this.objective.type === 'preventEscapes') {
      this.failed = true;
    }
  }

  updateElapsed(elapsedSeconds: number): void {
    if (this.objective.type === 'surviveTime') {
      this.progress = Math.min(this.objective.target, elapsedSeconds);
    }
  }

  isComplete(): boolean {
    return !this.failed && this.progress >= this.objective.target;
  }

  getLabel(): string {
    return `${this.objective.label}: ${Math.min(this.progress, this.objective.target)}/${this.objective.target}`;
  }
}
