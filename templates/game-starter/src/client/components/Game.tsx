import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { gameConfig } from "../game/config";

export function Game() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    // Create Phaser game instance
    gameRef.current = new Phaser.Game({
      ...gameConfig,
      parent: containerRef.current,
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div 
        ref={containerRef}
        id="game-container"
        className="relative rounded-lg overflow-hidden shadow-2xl"
        style={{ width: '800px', height: '600px' }}
      />
    </div>
  );
}