/**
 * Sprite Factory - Generate sprites procedurally or use emojis
 * Provides quick visual assets without external files
 */

import Phaser from 'phaser';

export class SpriteFactory {
  private scene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  
  /**
   * Create a character sprite using shapes
   */
  createCharacter(
    x: number, 
    y: number, 
    type: 'hero' | 'enemy' | 'npc' = 'hero',
    color: number = 0x00ff00
  ): Phaser.GameObjects.Container {
    const container = this.scene.add.container(x, y);
    
    if (type === 'hero') {
      // Body
      const body = this.scene.add.rectangle(0, 0, 24, 32, color);
      // Head
      const head = this.scene.add.circle(0, -20, 12, color + 0x333333);
      // Eyes
      const eyeL = this.scene.add.circle(-4, -22, 3, 0xffffff);
      const eyeR = this.scene.add.circle(4, -22, 3, 0xffffff);
      
      container.add([body, head, eyeL, eyeR]);
    } else if (type === 'enemy') {
      // Triangle body for enemies
      const body = this.scene.add.triangle(0, 0, -15, 15, 15, 15, 0, -15, 0xff0000);
      // Angry eyes
      const eyeL = this.scene.add.rectangle(-5, -5, 4, 2, 0xffffff);
      const eyeR = this.scene.add.rectangle(5, -5, 4, 2, 0xffffff);
      
      container.add([body, eyeL, eyeR]);
    } else {
      // NPC - simple circle
      const body = this.scene.add.circle(0, 0, 16, 0xffcc00);
      const eyeL = this.scene.add.circle(-5, -3, 2, 0x000000);
      const eyeR = this.scene.add.circle(5, -3, 2, 0x000000);
      
      container.add([body, eyeL, eyeR]);
    }
    
    return container;
  }
  
  /**
   * Create platform/tile with visual depth
   */
  createPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    style: 'grass' | 'stone' | 'ice' | 'metal' = 'grass'
  ): Phaser.GameObjects.Container {
    const container = this.scene.add.container(x, y);
    
    const colors = {
      grass: { main: 0x4a7c2e, shadow: 0x2d4a1c, highlight: 0x6ba644 },
      stone: { main: 0x808080, shadow: 0x505050, highlight: 0xa0a0a0 },
      ice: { main: 0x87ceeb, shadow: 0x4682b4, highlight: 0xadd8e6 },
      metal: { main: 0x708090, shadow: 0x2f4f4f, highlight: 0x778899 }
    };
    
    const palette = colors[style];
    
    // Shadow
    const shadow = this.scene.add.rectangle(2, 2, width, height, palette.shadow, 0.5);
    // Main platform
    const main = this.scene.add.rectangle(0, 0, width, height, palette.main);
    // Highlight
    const highlight = this.scene.add.rectangle(0, -height/4, width - 4, 2, palette.highlight);
    
    container.add([shadow, main, highlight]);
    
    return container;
  }
  
  /**
   * Create collectible items
   */
  createCollectible(
    x: number,
    y: number,
    type: 'coin' | 'gem' | 'star' | 'heart' = 'coin'
  ): Phaser.GameObjects.Container {
    const container = this.scene.add.container(x, y);
    
    switch(type) {
      case 'coin':
        const coin = this.scene.add.circle(0, 0, 10, 0xffd700);
        const inner = this.scene.add.circle(0, 0, 6, 0xffed4e);
        container.add([coin, inner]);
        // Add rotation animation
        this.scene.tweens.add({
          targets: container,
          rotation: Math.PI * 2,
          duration: 3000,
          repeat: -1
        });
        break;
        
      case 'gem':
        const gem = this.scene.add.polygon(0, 0, '0,-12 8,-4 8,4 0,12 -8,4 -8,-4', 0x00ffff);
        const shine = this.scene.add.polygon(0, -4, '0,-4 3,-1 3,1 0,4 -3,1 -3,-1', 0xffffff);
        container.add([gem, shine]);
        // Add pulsing effect
        this.scene.tweens.add({
          targets: container,
          scale: 1.2,
          duration: 1000,
          yoyo: true,
          repeat: -1
        });
        break;
        
      case 'star':
        const star = this.scene.add.star(0, 0, 5, 8, 16, 0xffff00);
        container.add(star);
        // Add spinning
        this.scene.tweens.add({
          targets: star,
          rotation: Math.PI * 2,
          duration: 2000,
          repeat: -1
        });
        break;
        
      case 'heart':
        const heart = this.scene.add.graphics();
        heart.fillStyle(0xff0080);
        heart.fillEllipse(-4, -4, 10, 10);
        heart.fillEllipse(4, -4, 10, 10);
        heart.fillTriangle(-7, 0, 7, 0, 0, 10);
        container.add(heart);
        // Add beating effect
        this.scene.tweens.add({
          targets: container,
          scale: 1.1,
          duration: 800,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.inOut'
        });
        break;
    }
    
    return container;
  }
  
  /**
   * Create emoji sprite (cross-platform)
   */
  createEmoji(
    x: number,
    y: number,
    emoji: string,
    size: number = 32
  ): Phaser.GameObjects.Text {
    const emojiSprite = this.scene.add.text(x, y, emoji, {
      fontSize: `${size}px`,
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    
    return emojiSprite;
  }
  
  /**
   * Create particle effect preset
   */
  createParticleEffect(
    x: number,
    y: number,
    type: 'explosion' | 'magic' | 'dust' | 'splash' = 'explosion'
  ): Phaser.GameObjects.Particles.ParticleEmitter {
    // Create a simple colored square as particle texture
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillRect(0, 0, 4, 4);
    graphics.generateTexture('particle', 4, 4);
    graphics.destroy();
    
    const configs = {
      explosion: {
        x: x,
        y: y,
        speed: { min: 100, max: 300 },
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        lifespan: 300,
        quantity: 20,
        tint: [0xff0000, 0xff8800, 0xffff00]
      },
      magic: {
        x: x,
        y: y,
        speed: { min: 50, max: 150 },
        scale: { start: 0.5, end: 0 },
        blendMode: 'ADD',
        lifespan: 1000,
        quantity: 5,
        frequency: 100,
        tint: [0x00ffff, 0xff00ff, 0xffff00],
        rotate: { min: 0, max: 360 }
      },
      dust: {
        x: x,
        y: y,
        speed: { min: 20, max: 40 },
        scale: { start: 0.3, end: 0 },
        lifespan: 500,
        quantity: 3,
        frequency: 50,
        tint: 0x808080,
        alpha: { start: 0.5, end: 0 }
      },
      splash: {
        x: x,
        y: y,
        speed: { min: 100, max: 200 },
        angle: { min: 250, max: 290 },
        scale: { start: 0.4, end: 0 },
        lifespan: 400,
        quantity: 10,
        tint: 0x0088ff,
        gravityY: 300
      }
    };
    
    const emitter = this.scene.add.particles(x, y, 'particle', configs[type]);
    
    // Auto-destroy explosion and splash effects
    if (type === 'explosion' || type === 'splash') {
      this.scene.time.delayedCall(1000, () => {
        emitter.destroy();
      });
    }
    
    return emitter;
  }
  
  /**
   * Create visual feedback effect
   */
  createFeedback(
    target: Phaser.GameObjects.GameObject,
    type: 'hit' | 'heal' | 'collect' | 'levelup' = 'hit'
  ): void {
    switch(type) {
      case 'hit':
        // Flash red
        this.scene.tweens.add({
          targets: target,
          tint: 0xff0000,
          duration: 100,
          yoyo: true,
          onComplete: () => {
            (target as any).clearTint();
          }
        });
        // Shake
        this.scene.cameras.main.shake(100, 0.01);
        break;
        
      case 'heal':
        // Flash green
        this.scene.tweens.add({
          targets: target,
          tint: 0x00ff00,
          duration: 200,
          yoyo: true,
          onComplete: () => {
            (target as any).clearTint();
          }
        });
        break;
        
      case 'collect':
        // Scale and fade
        this.scene.tweens.add({
          targets: target,
          scale: 1.5,
          alpha: 0,
          duration: 300,
          onComplete: () => {
            target.destroy();
          }
        });
        break;
        
      case 'levelup':
        // Pulse and particles
        this.scene.tweens.add({
          targets: target,
          scale: 1.3,
          duration: 500,
          yoyo: true,
          repeat: 2
        });
        // Add sparkles around
        const x = (target as any).x || 0;
        const y = (target as any).y || 0;
        this.createParticleEffect(x, y, 'magic');
        break;
    }
  }
}