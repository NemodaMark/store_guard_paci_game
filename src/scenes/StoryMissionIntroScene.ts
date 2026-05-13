import Phaser from 'phaser';
import { createStoryModeConfig } from '../modes/StoryModeConfig';
import { STORY_MISSIONS } from '../story/StoryMission';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class StoryMissionIntroScene extends Phaser.Scene {
  constructor() {
    super('StoryMissionIntroScene');
  }

  create(data: { missionId: string }): void {
    const mission = STORY_MISSIONS.find((candidate) => candidate.id === data.missionId) ?? STORY_MISSIONS[0];
    this.add.rectangle(640, 360, 1280, 720, 0x101828);
    this.add.text(640, 62, mission.title.toUpperCase(), pixelTextStyle(44)).setOrigin(0.5);
    this.add.text(640, 128, mission.description, pixelTextStyle(22, '#fff3b0')).setOrigin(0.5);
    this.add.rectangle(640, 250, 900, 180, 0x243b53, 0.9).setStrokeStyle(4, 0xffffff);
    mission.introDialogue.forEach((line, index) => {
      this.add.text(230, 200 + index * 44, line, pixelTextStyle(24, '#ffffff'));
    });
    this.add.text(640, 405, `MISSION OBJECTIVE: ${mission.objective.label}`, pixelTextStyle(28, '#ffffff')).setOrigin(0.5);
    this.add.text(640, 470, `UNLOCKED FEATURE: ${mission.unlockedFeature.name}`, pixelTextStyle(22, '#43b7ff')).setOrigin(0.5);
    createButton(this, 500, 615, 'START', () => this.scene.start('GameScene', createStoryModeConfig(mission)), 260);
    createButton(this, 800, 615, 'BACK', () => this.scene.start('StoryMapScene'), 260);
  }
}
