import Phaser from "phaser";
import { SpriteFactory } from "../utils/sprite-factory";
import { GamePresets, detectGameType } from "../presets";

/**
 * Main Game Scene - Template with examples
 * The AI agent will replace this with actual game content
 */
export class MainScene extends Phaser.Scene {
  private spriteFactory!: SpriteFactory;
  
  constructor() {
    super({ key: "MainScene" });
  }

  /**
   * Preload assets
   * AI should load any external assets here
   */
  preload() {
    // Create particle texture for effects
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillRect(0, 0, 4, 4);
    graphics.generateTexture('particle', 4, 4);
    graphics.destroy();
  }

  /**
   * Create game objects and setup
   * This is where the AI will build the game
   */
  create() {
    // Initialize sprite factory
    this.spriteFactory = new SpriteFactory(this);
    
    // Example: Auto-detect game type (AI will use this)
    const gameType = detectGameType("platformer"); // AI will pass actual description
    const preset = GamePresets[gameType];
    
    // Apply preset physics
    if (this.physics.world) {
      this.physics.world.gravity.x = preset.physics.gravity.x;
      this.physics.world.gravity.y = preset.physics.gravity.y;
    }
    
    // Get screen dimensions
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create gradient background (better than solid color)
    const bg = this.add.graphics();
    const color1 = 0x1a1a2e;
    const color2 = 0x0f0f1e;
    bg.fillGradientStyle(color1, color1, color2, color2);
    bg.fillRect(0, 0, width, height);
    
    // EXAMPLE: Create UI with RexUI plugin
    if ((this as any).rexUI) {
      const dialog = (this as any).rexUI.add.dialog({
        x: centerX,
        y: 100,
        width: 400,
        height: 80,
        background: (this as any).rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
        title: this.add.text(0, 0, '🎮 Game Template Ready!', {
          fontSize: '24px',
          color: '#ffffff'
        }),
        content: this.add.text(0, 0, 'AI will create your game here', {
          fontSize: '16px',
          color: '#94a3b8'
        }),
        align: {
          title: 'center',
          content: 'center'
        },
        space: {
          left: 20, right: 20, top: 20, bottom: 20,
          title: 10
        }
      }).layout();
    }
    
    // EXAMPLE: Create character using SpriteFactory
    const hero = this.spriteFactory.createCharacter(centerX - 100, centerY, 'hero', 0x00ff00);
    const enemy = this.spriteFactory.createCharacter(centerX + 100, centerY, 'enemy');
    
    // Add bounce animation to show they're alive
    this.tweens.add({
      targets: [hero, enemy],
      y: centerY - 20,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.inOut'
    });
    
    // EXAMPLE: Create collectibles
    const coin = this.spriteFactory.createCollectible(centerX - 50, centerY + 100, 'coin');
    const gem = this.spriteFactory.createCollectible(centerX, centerY + 100, 'gem');
    const star = this.spriteFactory.createCollectible(centerX + 50, centerY + 100, 'star');
    
    // EXAMPLE: Platform
    const platform = this.spriteFactory.createPlatform(centerX, height - 100, 300, 20, 'grass');
    
    // EXAMPLE: Emoji sprites
    const catEmoji = this.spriteFactory.createEmoji(100, 100, '🐱', 48);
    const pizzaEmoji = this.spriteFactory.createEmoji(150, 100, '🍕', 48);
    const rocketEmoji = this.spriteFactory.createEmoji(200, 100, '🚀', 48);
    
    // Add floating animation to emojis
    [catEmoji, pizzaEmoji, rocketEmoji].forEach((emoji, i) => {
      this.tweens.add({
        targets: emoji,
        y: 80,
        duration: 1500 + (i * 200),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.inOut'
      });
    });
    
    // EXAMPLE: Interactive elements
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Create particle explosion at click
      this.spriteFactory.createParticleEffect(pointer.x, pointer.y, 'explosion');
      
      // Screen shake for juice
      if (preset.polish.screenShake) {
        this.cameras.main.shake(200, 0.01);
      }
    });
    
    // EXAMPLE: Keyboard controls hint
    const controlsText = this.add.text(width / 2, height - 30, 
      '⌨️ Arrow Keys to Move | Space to Jump | Click for Effects', {
      fontSize: '16px',
      color: '#64748b'
    }).setOrigin(0.5);
    
    // Add glow effect to controls
    this.tweens.add({
      targets: controlsText,
      alpha: 0.7,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });
  }

  /**
   * Update loop
   * AI will add game logic here
   */
  update(_time: number, _delta: number) {
    // Game update logic will go here
  }
}