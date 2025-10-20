# Agent Guidelines for Game Development - ENHANCED

This template provides a PROFESSIONAL foundation for creating HIGH-QUALITY 2D, 2.5D, and 3D games using Phaser.js with advanced tools and polish. You MUST create games with professional quality.

## App Architecture Overview

This app uses a **client-server architecture** with:

- **Primary language**: TypeScript
- **Game Engine**: Phaser.js 3.80+ with Rex Plugins
- **Frontend**: React 19 + Vite + Tailwind CSS 4
- **Backend**: Hono server for game APIs
- **Visual Tools**: SpriteFactory, BaseCharacter, GamePresets
- **UI Library**: Rex UI Plugin (professional UI components)

## MANDATORY QUALITY REQUIREMENTS

### 1. Visual Quality - NO PLAIN SHAPES
```typescript
// ❌ NEVER DO THIS:
this.add.rectangle(100, 100, 50, 50, 0xff0000);

// ✅ ALWAYS DO THIS:
import { SpriteFactory } from '../utils/sprite-factory';
const factory = new SpriteFactory(this);
const hero = factory.createCharacter(100, 100, 'hero');
// Or use emojis:
const cat = factory.createEmoji(100, 100, '🐱', 48);
```

### 2. Full Screen Canvas - ALWAYS
```typescript
// In config.ts - Already configured:
scale: {
  mode: Phaser.Scale.RESIZE,
  width: window.innerWidth,
  height: window.innerHeight,
}
```

### 3. Use Game Presets - DETECT TYPE
```typescript
import { detectGameType, GamePresets } from '../presets';

// Auto-detect and apply optimal settings:
const gameType = detectGameType(userDescription);
const preset = GamePresets[gameType];
this.physics.world.gravity.y = preset.physics.gravity.y;
```

## AVAILABLE TOOLS - USE THEM!

### SpriteFactory - Visual Assets
```typescript
const factory = new SpriteFactory(this);

// Characters with built-in animations:
factory.createCharacter(x, y, 'hero'|'enemy'|'npc', color);

// Platforms with depth and style:
factory.createPlatform(x, y, width, height, 'grass'|'stone'|'ice');

// Collectibles with animations:
factory.createCollectible(x, y, 'coin'|'gem'|'star'|'heart');

// Particle effects:
factory.createParticleEffect(x, y, 'explosion'|'magic'|'dust');

// Visual feedback:
factory.createFeedback(sprite, 'hit'|'heal'|'collect'|'levelup');

// Emojis as sprites:
factory.createEmoji(x, y, '🎮', size);
```

### BaseCharacter - Full Character System
```typescript
import { BaseCharacter } from '../components/BaseCharacter';

class Player extends BaseCharacter {
  constructor(scene: Phaser.Scene) {
    super({
      scene,
      x: 100,
      y: 300,
      speed: 200,
      jumpHeight: 400,
      health: 3
    });
  }
}

// Built-in methods:
player.move('left'|'right'|'stop');
player.jump(allowDoubleJump);
player.takeDamage(1);  // Has invulnerability, flash, shake
player.heal(1);        // Has particles, effects
player.powerUp(5000);  // Temporary boost with visuals
player.addTrail();     // Trail effect
```

### Rex UI Plugin - Professional UI
```typescript
// Dialog boxes:
const dialog = this.rexUI.add.dialog({
  title: 'Game Over',
  content: `Score: ${score}`,
  buttons: ['Retry', 'Menu']
});

// Buttons with style:
const button = this.rexUI.add.label({
  background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x5555ff),
  text: this.add.text(0, 0, 'Start'),
  icon: this.add.image(0, 0, 'icon')
});

// Health bars, sliders, etc.
```

## Game Development Patterns

### Polish Effects - MANDATORY
```typescript
// Screen shake on impact:
this.cameras.main.shake(200, 0.01);

// Tweens for ALL movements:
this.tweens.add({
  targets: sprite,
  x: 500,
  duration: 1000,
  ease: 'Power2'
});

// Particles on EVERY interaction:
factory.createParticleEffect(x, y, 'explosion');

// Juice - squash and stretch:
this.tweens.add({
  targets: player,
  scaleX: 1.2,
  scaleY: 0.8,
  duration: 100,
  yoyo: true
});
```

### Scene Structure - REQUIRED
```typescript
// Minimum 3 scenes:
- MenuScene (with UI)
- GameScene (main gameplay)
- GameOverScene (score, retry)

// Transitions:
this.scene.start('GameScene', { level: 1 });
```

### Common Game Types - Examples

#### Platformer
```typescript
const factory = new SpriteFactory(this);
const player = new BaseCharacter({ scene: this, x: 100, y: 300 });
const platforms = [];

// Create level
for (let i = 0; i < 5; i++) {
  const platform = factory.createPlatform(i * 200, 400, 150, 20, 'grass');
  this.physics.add.existing(platform);
  platforms.push(platform);
}

// Collectibles
for (let i = 0; i < 10; i++) {
  const coin = factory.createCollectible(i * 80, 300, 'coin');
  this.physics.add.overlap(player, coin, () => {
    factory.createFeedback(coin, 'collect');
    score += 10;
  });
}
```

#### Shooter
```typescript
// Use emojis for quick themed sprites
const ship = factory.createEmoji(400, 500, '🚀', 48);
const enemies = [];

// Spawn enemies
this.time.addEvent({
  delay: 1000,
  callback: () => {
    const enemy = factory.createEmoji(Phaser.Math.Between(0, 800), 0, '👾', 32);
    enemies.push(enemy);
  },
  loop: true
});
```

## File Structure

```
src/client/game/
├── config.ts         # Game configuration with Rex plugins
├── scenes/          
│   ├── MainScene.ts  # Entry scene
│   ├── MenuScene.ts  # AI should create
│   └── GameScene.ts  # AI should create
├── components/       
│   └── BaseCharacter.ts  # Use this for characters
├── utils/           
│   └── sprite-factory.ts  # Use for ALL visuals
└── presets/         
    └── index.ts     # Game type detection
```

## Performance Optimization

- Use object pooling for bullets/enemies
- Limit particle emitters
- Destroy off-screen objects
- Use texture atlases when possible
- Keep physics bodies simple

## Important Rules

1. **NEVER use plain rectangles** - Always use SpriteFactory
2. **ALWAYS fill the screen** - Use RESIZE scale mode
3. **EVERY interaction needs feedback** - Particles, sounds, shake
4. **Minimum 3 scenes** - Menu, Game, GameOver
5. **Use emojis for quick sprites** - 🎮🚀👾🍕⭐
6. **Detect game type** - Use presets for optimal settings
7. **Polish is mandatory** - Tweens, juice, effects

## Common Emoji Sprites

- Characters: 🐱🐶🦊🐸🐰🦆🐥🦄
- Enemies: 👾👻👹🤖💀🦇🕷️
- Food: 🍕🍔🍟🌭🍿🍩🍪🍰
- Collectibles: ⭐💎💰🏆🎁🔑💝
- Vehicles: 🚗🏎️🚀✈️🚁🛸🚢
- Nature: 🌳🌲🌴🌵🌻🌺🍄
- Effects: 💥✨🔥❄️💨💦⚡

Remember: The goal is to create PROFESSIONAL, POLISHED games that feel complete and fun to play!