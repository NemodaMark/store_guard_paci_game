import Phaser from 'phaser';
import { FeatureUnlockManager } from '../story/FeatureUnlockManager';
import { STORY_MISSIONS } from '../story/StoryMission';
import { StoryProgressManager } from '../story/StoryProgressManager';
import { createButton } from '../ui/Button';
import { pixelTextStyle } from '../utils/pixelText';

export class StoryMapScene extends Phaser.Scene {
  private readonly progress = new StoryProgressManager();
  private readonly unlocks = new FeatureUnlockManager(this.progress);

  constructor() {
    super('StoryMapScene');
  }

  create(): void {
    const progress = this.progress.getProgress();
    const completed = new Set(progress.completedMissionIds);
    const nextMission = STORY_MISSIONS.find((mission) => !completed.has(mission.id)) ?? STORY_MISSIONS[STORY_MISSIONS.length - 1];

    this.add.rectangle(640, 360, 1280, 720, 0x18243a);
    this.add.text(640, 56, 'STORY MODE', pixelTextStyle(48)).setOrigin(0.5);
    this.add.text(96, 118, 'COMPLETED MISSIONS', pixelTextStyle(24, '#fff3b0'));
    STORY_MISSIONS.forEach((mission, index) => {
      const y = 160 + index * 48;
      const done = completed.has(mission.id);
      this.add.rectangle(330, y + 15, 470, 36, done ? 0x2d6a4f : 0x243b53, 0.82);
      this.add.text(112, y, `${done ? 'DONE' : 'NEXT'}  ${mission.title}`, pixelTextStyle(20, '#ffffff'));
    });

    this.add.text(700, 118, 'UNLOCKED FEATURES', pixelTextStyle(24, '#fff3b0'));
    const features = this.unlocks.getUnlockedFeatures();
    if (features.length === 0) {
      this.add.text(720, 176, 'Complete Mission 1 to unlock the first feature.', pixelTextStyle(18, '#ffffff'));
    }
    features.forEach((feature, index) => {
      const y = 164 + index * 86;
      this.add.rectangle(930, y + 28, 430, 70, 0x1b4965, 0.82).setStrokeStyle(2, 0x43b7ff);
      this.add.text(730, y, feature.name, pixelTextStyle(20, '#ffffff'));
      this.add.text(730, y + 30, feature.gameplayEffect, pixelTextStyle(15, '#fff3b0'));
    });

    this.add.text(640, 535, `NEXT MISSION: ${nextMission.title}`, pixelTextStyle(28, '#ffffff')).setOrigin(0.5);
    createButton(this, 500, 635, 'START MISSION', () => this.scene.start('StoryMissionIntroScene', { missionId: nextMission.id }), 300);
    createButton(this, 820, 635, 'MENU', () => this.scene.start('MainMenuScene'), 260);
  }
}
