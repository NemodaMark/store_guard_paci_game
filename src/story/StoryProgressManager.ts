const STORY_PROGRESS_KEY = 'boltor-paci-story-progress';

export interface StoryProgress {
  completedMissionIds: string[];
  unlockedFeatureIds: string[];
}

export class StoryProgressManager {
  getProgress(): StoryProgress {
    const raw = localStorage.getItem(STORY_PROGRESS_KEY);
    if (!raw) {
      return { completedMissionIds: [], unlockedFeatureIds: [] };
    }

    try {
      const progress = JSON.parse(raw) as StoryProgress;
      return {
        completedMissionIds: Array.isArray(progress.completedMissionIds) ? progress.completedMissionIds : [],
        unlockedFeatureIds: Array.isArray(progress.unlockedFeatureIds) ? progress.unlockedFeatureIds : []
      };
    } catch {
      return { completedMissionIds: [], unlockedFeatureIds: [] };
    }
  }

  completeMission(missionId: string, featureId: string): StoryProgress {
    const progress = this.getProgress();
    const completedMissionIds = Array.from(new Set([...progress.completedMissionIds, missionId]));
    const unlockedFeatureIds = Array.from(new Set([...progress.unlockedFeatureIds, featureId]));
    const next = { completedMissionIds, unlockedFeatureIds };
    localStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify(next));
    return next;
  }
}
