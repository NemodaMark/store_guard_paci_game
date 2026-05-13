import { ArcadeDifficulty } from '../modes/GameModeConfig';
import { FraudType } from '../types';

export type StoryObjectiveType = 'catchTotal' | 'catchFraudType' | 'surviveTime' | 'preventEscapes' | 'catchWithinTime';

export interface StoryMissionObjective {
  type: StoryObjectiveType;
  target: number;
  fraudType?: FraudType;
  timeLimitSeconds?: number;
  label: string;
}

export interface StoryFeatureUnlock {
  id: string;
  name: string;
  businessMeaning: string;
  gameplayEffect: string;
}

export interface StoryMission {
  id: string;
  title: string;
  description: string;
  objective: StoryMissionObjective;
  unlockedFeature: StoryFeatureUnlock;
  introDialogue: string[];
  outroDialogue: string[];
  roundTime: number;
  difficulty: ArcadeDifficulty;
  enabledFraudTypes: FraudType[];
  maxActiveMonsters: number;
  randomLayout: boolean;
  goldenMonsterEnabled: boolean;
  comboEnabled: boolean;
}

export const STORY_MISSIONS: StoryMission[] = [
  {
    id: 'first-alert',
    title: 'First Alert',
    description: 'Paci learns how the store alert system marks suspicious behavior.',
    objective: { type: 'catchFraudType', fraudType: FraudType.Shoplifting, target: 1, label: 'Catch 1 shoplifting monster' },
    unlockedFeature: {
      id: 'alert-system',
      name: 'Alert System',
      businessMeaning: 'Flags suspicious incidents as soon as risky behavior appears.',
      gameplayEffect: 'Fraud alerts appear above suspicious monsters.'
    },
    introDialogue: ['Welcome, Paci. The store is calm, but one thief is testing us.', 'Watch the alert and catch the shoplifter.'],
    outroDialogue: ['Nice catch. The alert system is online and the team can react faster.'],
    roundTime: 60,
    difficulty: 'easy',
    enabledFraudTypes: [FraudType.Shoplifting],
    maxActiveMonsters: 1,
    randomLayout: false,
    goldenMonsterEnabled: false,
    comboEnabled: false
  },
  {
    id: 'shelf-theft',
    title: 'Shelf Theft',
    description: 'Use camera-style awareness to stop repeat theft from shelves.',
    objective: { type: 'catchFraudType', fraudType: FraudType.Shoplifting, target: 3, label: 'Catch 3 shoplifters' },
    unlockedFeature: {
      id: 'cctv-support',
      name: 'CCTV Camera Support',
      businessMeaning: 'Helps monitor suspicious activity inside the store.',
      gameplayEffect: 'Suspicious monsters are highlighted for a short time.'
    },
    introDialogue: ['Shelf traffic is heavier now.', 'CCTV support helps Paci spot repeated shoplifting.'],
    outroDialogue: ['Three shelf thieves stopped. CCTV support is ready for demos.'],
    roundTime: 90,
    difficulty: 'normal',
    enabledFraudTypes: [FraudType.Shoplifting],
    maxActiveMonsters: 2,
    randomLayout: true,
    goldenMonsterEnabled: false,
    comboEnabled: true
  },
  {
    id: 'cash-register-trouble',
    title: 'Cash Register Trouble',
    description: 'Catch a fraud attempt near the checkout lane.',
    objective: { type: 'catchFraudType', fraudType: FraudType.CashTheft, target: 1, label: 'Catch 1 cashier fraud monster' },
    unlockedFeature: {
      id: 'cash-register-audit',
      name: 'Cash Register Audit',
      businessMeaning: 'Connects checkout activity to fraud signals and suspicious exceptions.',
      gameplayEffect: 'Cash register fraud makes the checkout flash clearly.'
    },
    introDialogue: ['The checkout lane is noisy today.', 'Look for the register flash and catch the fraudster.'],
    outroDialogue: ['Checkout secured. Cash Register Audit is unlocked.'],
    roundTime: 90,
    difficulty: 'normal',
    enabledFraudTypes: [FraudType.CashTheft],
    maxActiveMonsters: 2,
    randomLayout: true,
    goldenMonsterEnabled: false,
    comboEnabled: true
  },
  {
    id: 'product-swap',
    title: 'Product Swap',
    description: 'Find and catch product swap fraud before the monster escapes.',
    objective: { type: 'catchFraudType', fraudType: FraudType.ProductSwap, target: 1, label: 'Catch 1 product swap fraud' },
    unlockedFeature: {
      id: 'product-tracking',
      name: 'Product Tracking',
      businessMeaning: 'Links products, shelf movement, and checkout events for better traceability.',
      gameplayEffect: 'Product swap warnings appear as question-mark alerts.'
    },
    introDialogue: ['Some products are not where they should be.', 'Track the swap warning and catch the culprit.'],
    outroDialogue: ['Product swap stopped. Product Tracking is unlocked.'],
    roundTime: 90,
    difficulty: 'normal',
    enabledFraudTypes: [FraudType.ProductSwap],
    maxActiveMonsters: 2,
    randomLayout: true,
    goldenMonsterEnabled: false,
    comboEnabled: true
  },
  {
    id: 'smart-store-system',
    title: 'Smart Store System',
    description: 'Survive a mixed scenario using all unlocked store intelligence.',
    objective: { type: 'surviveTime', target: 75, label: 'Survive 75 seconds of mixed fraud' },
    unlockedFeature: {
      id: 'ai-behavior-detection',
      name: 'AI Behavior Detection',
      businessMeaning: 'Combines many store signals to detect suspicious behavior patterns.',
      gameplayEffect: 'Multiple fraud types can appear at the same time.'
    },
    introDialogue: ['Final demo scenario. Every system is feeding Paci signals now.', 'Stay sharp through the mixed fraud rush.'],
    outroDialogue: ['Smart Store System complete. Paci is presentation-ready.'],
    roundTime: 120,
    difficulty: 'hard',
    enabledFraudTypes: [FraudType.Shoplifting, FraudType.CashTheft, FraudType.ProductSwap],
    maxActiveMonsters: 4,
    randomLayout: true,
    goldenMonsterEnabled: true,
    comboEnabled: true
  }
];
