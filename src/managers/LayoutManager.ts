import { CHECKOUT_ZONE } from '../config/gameRules';
import { choose } from '../utils/random';

export interface ShelfSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  label: string;
}

export interface LayoutPreset {
  id: string;
  name: string;
  shelves: ShelfSpec[];
  checkouts: ShelfSpec[];
}

const checkoutBase: ShelfSpec[] = [
  { x: 954, y: 520, width: 112, height: 48, color: 0x2f4858, label: 'KASSZA' },
  { x: 1100, y: 520, width: 78, height: 48, color: 0x2f4858, label: 'KASSZA' }
];

export const LAYOUT_PRESETS: LayoutPreset[] = [
  {
    id: 'compact',
    name: 'Compact Supermarket',
    shelves: [
      { x: 220, y: 190, width: 255, height: 54, color: 0xf25f5c, label: 'FRISS' },
      { x: 220, y: 330, width: 255, height: 54, color: 0x4ecdc4, label: 'ITAL' },
      { x: 530, y: 190, width: 260, height: 54, color: 0x6a4c93, label: 'TEJ' },
      { x: 530, y: 330, width: 260, height: 54, color: 0xff9f1c, label: 'AKCIO' },
      { x: 785, y: 260, width: 54, height: 230, color: 0x3a86ff, label: 'HUTO' },
      { x: 1040, y: 232, width: 82, height: 214, color: 0x90be6d, label: 'RAKTAR' }
    ],
    checkouts: checkoutBase
  },
  {
    id: 'open',
    name: 'Open Supermarket',
    shelves: [
      { x: 240, y: 188, width: 250, height: 48, color: 0xf25f5c, label: 'FRISS' },
      { x: 560, y: 188, width: 250, height: 48, color: 0x4ecdc4, label: 'ITAL' },
      { x: 870, y: 188, width: 190, height: 48, color: 0x3a86ff, label: 'HUTO' },
      { x: 330, y: 430, width: 280, height: 48, color: 0xffc857, label: 'NASI' },
      { x: 690, y: 430, width: 230, height: 48, color: 0xff9f1c, label: 'AKCIO' }
    ],
    checkouts: checkoutBase
  },
  {
    id: 'crowded',
    name: 'Crowded Shelves',
    shelves: [
      { x: 205, y: 172, width: 230, height: 46, color: 0xf25f5c, label: 'FRISS' },
      { x: 205, y: 282, width: 230, height: 46, color: 0x4ecdc4, label: 'ITAL' },
      { x: 205, y: 392, width: 230, height: 46, color: 0xffc857, label: 'NASI' },
      { x: 500, y: 172, width: 230, height: 46, color: 0x6a4c93, label: 'TEJ' },
      { x: 500, y: 282, width: 230, height: 46, color: 0x2ec4b6, label: 'ZOLD' },
      { x: 500, y: 392, width: 230, height: 46, color: 0xff9f1c, label: 'AKCIO' },
      { x: 805, y: 172, width: 210, height: 46, color: 0x3a86ff, label: 'HUTO' },
      { x: 805, y: 330, width: 210, height: 46, color: 0x90be6d, label: 'BIO' },
      { x: 1040, y: 238, width: 76, height: 210, color: 0x90be6d, label: 'RAKTAR' }
    ],
    checkouts: checkoutBase
  },
  {
    id: 'maze',
    name: 'Maze-like Layout',
    shelves: [
      { x: 205, y: 188, width: 260, height: 48, color: 0xf25f5c, label: 'FRISS' },
      { x: 360, y: 314, width: 48, height: 210, color: 0x4ecdc4, label: 'ITAL' },
      { x: 560, y: 205, width: 245, height: 48, color: 0x6a4c93, label: 'TEJ' },
      { x: 680, y: 370, width: 48, height: 220, color: 0xffc857, label: 'NASI' },
      { x: 870, y: 250, width: 220, height: 48, color: 0x3a86ff, label: 'HUTO' },
      { x: 1015, y: 372, width: 48, height: 170, color: 0x90be6d, label: 'BIO' }
    ],
    checkouts: checkoutBase
  },
  {
    id: 'checkout-heavy',
    name: 'Checkout-heavy Layout',
    shelves: [
      { x: 210, y: 190, width: 255, height: 54, color: 0xf25f5c, label: 'FRISS' },
      { x: 210, y: 345, width: 255, height: 54, color: 0x4ecdc4, label: 'ITAL' },
      { x: 535, y: 242, width: 260, height: 54, color: 0xffc857, label: 'NASI' },
      { x: 800, y: 175, width: 210, height: 48, color: 0x3a86ff, label: 'HUTO' }
    ],
    checkouts: [
      ...checkoutBase,
      { x: CHECKOUT_ZONE.x + 46, y: 462, width: 84, height: 42, color: 0x2f4858, label: 'KASSZA' },
      { x: CHECKOUT_ZONE.x + 160, y: 462, width: 84, height: 42, color: 0x2f4858, label: 'KASSZA' }
    ]
  }
];

export class LayoutManager {
  static chooseRandomPreset(): LayoutPreset {
    return choose(LAYOUT_PRESETS);
  }
}
