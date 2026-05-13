# Boltőr Paci

Boltőr Paci is a lightweight retro pixel arcade game for Android tablets in landscape mode. Paci patrols a supermarket, spots suspicious disguised green monsters, and catches them before they escape.

## Features

- Phaser 3 + TypeScript + Vite
- PWA manifest and service worker setup
- Android tablet landscape scaling
- Main menu with Story Mode, Arcade Mode, Leaderboard, and Settings
- Arcade settings for difficulty, round time, layout, golden monster, and combo rules
- Story mission flow with intros, objectives, feature unlock cards, and progress screen
- HUD, pause, and mode-aware game over flow
- 120 second time attack rounds
- Tap-to-move controls plus a left-side virtual joystick
- Five randomized supermarket layout presets
- Difficulty scaling with up to four simultaneous active fraud events
- Wandering customers, employees, and disguised monsters
- Three fraud event types: shoplifting, cash theft, and product swap
- Combo scoring with a max x4 multiplier
- Rare golden thief worth extra points
- Local top-10 leaderboard with tablet-friendly name entry
- Generated placeholder pixel sprites and retro sound effects
- Upgrade system foundation for future movement, catch radius, sprint, and radar improvements

## Setup

```bash
npm install
npm run dev
```

Then open the local Vite URL on a desktop browser or Android tablet. For tablet testing, use the LAN URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  scenes/      Phaser scene flow
  entities/    Paci, NPCs, monsters
  systems/     AI, events, collision, scoring, timers, audio, map, controls
  managers/    Difficulty, combo, leaderboard, layouts, upgrades
  modes/       Reusable Arcade and Story game configurations
  story/       Missions, objectives, progress, feature unlocks
  leaderboard/ Arcade leaderboard exports
  ui/          HUD and reusable buttons
  config/      Game constants and Phaser config
  utils/       Shared helpers
```
