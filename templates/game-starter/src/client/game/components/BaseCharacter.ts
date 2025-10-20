/**
 * Base Character Component
 * Reusable character class with common functionality
 */

import Phaser from 'phaser';

export interface CharacterConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture?: string;
  speed?: number;
  jumpHeight?: number;
  health?: number;
  scale?: number;
}

export class BaseCharacter extends Phaser.Physics.Arcade.Sprite {
  protected speed: number;
  protected jumpHeight: number;
  protected health: number;
  protected maxHealth: number;
  protected isJumping: boolean = false;
  protected facing: 'left' | 'right' = 'right';
  protected invulnerable: boolean = false;
  protected trail?: Phaser.GameObjects.Particles.ParticleEmitter;
  
  constructor(config: CharacterConfig) {
    super(config.scene, config.x, config.y, config.texture || '');
    
    // Add to scene
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    
    // Set properties
    this.speed = config.speed || 200;
    this.jumpHeight = config.jumpHeight || 400;
    this.health = config.health || 3;
    this.maxHealth = this.health;
    
    // Set scale
    if (config.scale) {
      this.setScale(config.scale);
    }
    
    // Enable physics
    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
  }
  
  /**
   * Move character horizontally
   */
  move(direction: 'left' | 'right' | 'stop'): void {
    switch(direction) {
      case 'left':
        this.setVelocityX(-this.speed);
        this.facing = 'left';
        this.setFlipX(true);
        break;
      case 'right':
        this.setVelocityX(this.speed);
        this.facing = 'right';
        this.setFlipX(false);
        break;
      case 'stop':
        this.setVelocityX(0);
        break;
    }
  }
  
  /**
   * Make character jump
   */
  jump(allowDoubleJump: boolean = false): void {
    const onGround = this.body?.blocked.down || this.body?.touching.down;
    
    if (onGround) {
      this.setVelocityY(-this.jumpHeight);
      this.isJumping = true;
      this.addJumpEffect();
    } else if (allowDoubleJump && this.isJumping) {
      // Double jump
      this.setVelocityY(-this.jumpHeight * 0.8);
      this.isJumping = false;
      this.addJumpEffect();
    }
  }
  
  /**
   * Add jump visual effect
   */
  protected addJumpEffect(): void {
    // Squash and stretch
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.2,
      scaleY: 0.8,
      duration: 100,
      yoyo: true,
      ease: 'Power2'
    });
    
    // Dust particles at feet
    if (this.scene.add.particles) {
      const emitter = this.scene.add.particles(this.x, this.y + 16, 'particle', {
        speed: { min: 20, max: 60 },
        scale: { start: 0.4, end: 0 },
        blendMode: 'ADD',
        lifespan: 200,
        quantity: 5,
        tint: 0x808080
      });
      
      this.scene.time.delayedCall(200, () => emitter.destroy());
    }
  }
  
  /**
   * Take damage
   */
  takeDamage(amount: number = 1): void {
    if (this.invulnerable) return;
    
    this.health -= amount;
    
    // Visual feedback
    this.flashRed();
    this.scene.cameras.main.shake(100, 0.01);
    
    // Invulnerability frames
    this.invulnerable = true;
    this.setAlpha(0.5);
    
    this.scene.time.delayedCall(1000, () => {
      this.invulnerable = false;
      this.setAlpha(1);
    });
    
    // Check death
    if (this.health <= 0) {
      this.die();
    }
  }
  
  /**
   * Heal character
   */
  heal(amount: number = 1): void {
    this.health = Math.min(this.health + amount, this.maxHealth);
    
    // Visual feedback
    this.flashGreen();
    
    // Heal particles
    if (this.scene.add.particles) {
      const emitter = this.scene.add.particles(this.x, this.y, 'particle', {
        speed: { min: 30, max: 60 },
        scale: { start: 0.5, end: 0 },
        blendMode: 'ADD',
        lifespan: 500,
        quantity: 10,
        tint: 0x00ff00,
        alpha: { start: 0.7, end: 0 }
      });
      
      this.scene.time.delayedCall(500, () => emitter.destroy());
    }
  }
  
  /**
   * Flash red on damage
   */
  protected flashRed(): void {
    this.setTint(0xff0000);
    this.scene.time.delayedCall(100, () => {
      this.clearTint();
    });
  }
  
  /**
   * Flash green on heal
   */
  protected flashGreen(): void {
    this.setTint(0x00ff00);
    this.scene.time.delayedCall(200, () => {
      this.clearTint();
    });
  }
  
  /**
   * Character death
   */
  die(): void {
    // Death animation
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      scale: 0,
      rotation: Math.PI * 2,
      duration: 500,
      onComplete: () => {
        this.destroy();
      }
    });
    
    // Death particles
    if (this.scene.add.particles) {
      const emitter = this.scene.add.particles(this.x, this.y, 'particle', {
        speed: { min: 100, max: 200 },
        scale: { start: 0.5, end: 0 },
        blendMode: 'ADD',
        lifespan: 300,
        quantity: 20,
        tint: [0xff0000, 0xff8800]
      });
      
      this.scene.time.delayedCall(1000, () => emitter.destroy());
    }
  }
  
  /**
   * Add trail effect to character
   */
  addTrail(color: number = 0xffff00): void {
    if (this.trail) {
      this.trail.destroy();
    }
    
    this.trail = this.scene.add.particles(0, 0, 'particle', {
      speed: 0,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
      lifespan: 100,
      frequency: 10,
      tint: color,
      alpha: { start: 0.5, end: 0 },
      follow: this
    });
  }
  
  /**
   * Power up effect
   */
  powerUp(duration: number = 5000): void {
    // Visual effect
    this.setScale(1.2);
    this.addTrail(0xffff00);
    
    // Pulsing glow
    this.scene.tweens.add({
      targets: this,
      scale: 1.3,
      duration: 500,
      yoyo: true,
      repeat: -1
    });
    
    // Temporary speed boost
    const originalSpeed = this.speed;
    this.speed *= 1.5;
    
    // Reset after duration
    this.scene.time.delayedCall(duration, () => {
      this.setScale(1);
      this.speed = originalSpeed;
      if (this.trail) {
        this.trail.destroy();
        this.trail = undefined;
      }
      this.scene.tweens.killTweensOf(this);
    });
  }
  
  /**
   * Update method (call from scene update)
   */
  update(): void {
    // Reset jump flag when on ground
    if (this.body?.blocked.down || this.body?.touching.down) {
      this.isJumping = false;
    }
    
    // Add slight drag when not moving
    if (this.body?.velocity.x === 0) {
      this.setDrag(100, 0);
    } else {
      this.setDrag(0, 0);
    }
  }
  
  /**
   * Get current health
   */
  getHealth(): number {
    return this.health;
  }
  
  /**
   * Get max health
   */
  getMaxHealth(): number {
    return this.maxHealth;
  }
  
  /**
   * Check if character is alive
   */
  isAlive(): boolean {
    return this.health > 0;
  }
}