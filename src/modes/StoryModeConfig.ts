import { GameModeConfig } from './GameModeConfig';
import { StoryMission } from '../story/StoryMission';

export function createStoryModeConfig(mission: StoryMission): GameModeConfig {
  return {
    mode: 'story',
    roundTime: mission.roundTime,
    difficulty: mission.difficulty,
    enabledFraudTypes: mission.enabledFraudTypes,
    maxActiveMonsters: mission.maxActiveMonsters,
    randomLayout: mission.randomLayout,
    goldenMonsterEnabled: mission.goldenMonsterEnabled,
    comboEnabled: mission.comboEnabled,
    missionId: mission.id,
    missionTitle: mission.title,
    missionObjective: mission.objective,
    featureUnlocks: [mission.unlockedFeature.id]
  };
}
