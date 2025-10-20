import Phaser from "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { MainScene } from "./scenes/MainScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Automatically choose WebGL or Canvas
  parent: "game-container", // DOM element ID to render the game
  backgroundColor: "#1a1a2e",
  scale: {
    mode: Phaser.Scale.RESIZE, // Fill the entire screen
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "arcade", // Simple physics for 2D games
    arcade: {
      gravity: { x: 0, y: 0 }, // Will be set by game preset
      debug: false, // Set to true to see physics bodies
    },
  },
  scene: [MainScene], // List of game scenes - agent will add more
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: true, // Also support gamepads
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      }
    ]
  },
  render: {
    antialias: true,
    pixelArt: false, // Set to true for pixel art games
    roundPixels: false,
  },
  fps: {
    target: 60,
    forceSetTimeOut: false
  }
};