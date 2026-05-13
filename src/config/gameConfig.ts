import Phaser from 'phaser';
import { ArcadeSettingsScene } from '../scenes/ArcadeSettingsScene';
import { BootScene } from '../scenes/BootScene';
import { GameOverScene } from '../scenes/GameOverScene';
import { GameScene } from '../scenes/GameScene';
import { LeaderboardScene } from '../scenes/LeaderboardScene';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { SettingsScene } from '../scenes/SettingsScene';
import { StoryMapScene } from '../scenes/StoryMapScene';
import { StoryMissionIntroScene } from '../scenes/StoryMissionIntroScene';
import { TutorialScene } from '../scenes/TutorialScene';

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#1e2b3a',
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    BootScene,
    MainMenuScene,
    ArcadeSettingsScene,
    StoryMapScene,
    StoryMissionIntroScene,
    TutorialScene,
    GameScene,
    GameOverScene,
    LeaderboardScene,
    SettingsScene
  ]
};
