export enum MonsterState {
  IDLE = 'IDLE',
  BLEND_IN = 'BLEND_IN',
  SUSPICIOUS = 'SUSPICIOUS',
  FRAUD = 'FRAUD',
  ESCAPE = 'ESCAPE',
  CAUGHT = 'CAUGHT'
}

export enum FraudType {
  Shoplifting = 'Shoplifting',
  CashTheft = 'Cash Theft',
  ProductSwap = 'Product Swap'
}

export interface FraudEvent {
  type: FraudType;
  title: string;
  icon: string;
}

export interface RoundResult {
  score: number;
  mode?: 'arcade' | 'story';
  missionId?: string;
  missionTitle?: string;
  featureUnlocks?: string[];
  storyComplete?: boolean;
}

export type Point = Phaser.Types.Math.Vector2Like;
