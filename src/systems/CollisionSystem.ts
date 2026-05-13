import Phaser from 'phaser';
import { Monster } from '../entities/Monster';
import { Player } from '../entities/Player';
import { MonsterState } from '../types';

export class CollisionSystem {
  constructor(private readonly scene: Phaser.Scene) {}

  addWorldColliders(
    player: Player,
    npcs: Phaser.GameObjects.GameObject[],
    monsters: Monster[],
    obstacles: Phaser.Physics.Arcade.StaticGroup
  ): void {
    this.scene.physics.add.collider(player, obstacles);
    npcs.forEach((npc) => this.scene.physics.add.collider(npc, obstacles));
    monsters.forEach((monster) => this.scene.physics.add.collider(monster, obstacles));
    this.scene.physics.add.collider(player, npcs);
    this.scene.physics.add.collider(player, monsters);

    const actors = [...npcs, ...monsters];
    actors.forEach((actor, index) => {
      actors.slice(index + 1).forEach((other) => this.scene.physics.add.collider(actor, other));
    });
  }

  addCatchOverlap(player: Player, monsters: Monster[], onCatch: (monster: Monster) => void): void {
    monsters.forEach((monster) => {
      this.scene.physics.add.overlap(player, monster, () => {
        if (monster.state === MonsterState.ESCAPE) {
          onCatch(monster);
        }
      });
    });
  }
}
