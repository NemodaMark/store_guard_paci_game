# Boltőr Paci

Boltőr Paci is a lightweight retro pixel arcade game for Android tablets in landscape mode. Paci patrols a supermarket, spots suspicious disguised green monsters, and catches them before they escape.

## Features

- Phaser 3 + TypeScript + Vite
- PWA manifest and service worker setup
- Android tablet landscape scaling
- Main menu, tutorial, HUD, pause, and game over flow
- 120 second time attack rounds
- Tap-to-move controls plus a left-side virtual joystick
- Wandering customers, employees, and disguised monsters
- Three fraud event types: shoplifting, cash theft, and product swap
- Generated placeholder pixel sprites and retro sound effects

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
  ui/          HUD and reusable buttons
  config/      Game constants and Phaser config
  utils/       Shared helpers
```
