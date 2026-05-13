import { STORY_MISSIONS, StoryFeatureUnlock } from './StoryMission';
import { StoryProgressManager } from './StoryProgressManager';

export class FeatureUnlockManager {
  constructor(private readonly progress = new StoryProgressManager()) {}

  getUnlockedFeatures(): StoryFeatureUnlock[] {
    const ids = new Set(this.progress.getProgress().unlockedFeatureIds);
    return STORY_MISSIONS.map((mission) => mission.unlockedFeature).filter((feature) => ids.has(feature.id));
  }

  getFeatureById(id: string): StoryFeatureUnlock | undefined {
    return STORY_MISSIONS.map((mission) => mission.unlockedFeature).find((feature) => feature.id === id);
  }
}
