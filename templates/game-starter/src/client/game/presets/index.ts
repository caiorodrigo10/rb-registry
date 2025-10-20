/**
 * Game presets for different genres
 * Provides optimal default configurations
 */

export interface GamePreset {
  physics: {
    gravity: { x: number; y: number };
    debug?: boolean;
  };
  player: {
    speed: number;
    jumpHeight?: number;
    fireRate?: number;
    health?: number;
  };
  camera: {
    lerp?: number;
    deadzone?: number;
    smooth?: boolean;
    zoom?: number;
  };
  polish: {
    screenShake: boolean;
    particles: boolean | 'subtle';
    tweenStyle: 'aggressive' | 'smooth' | 'gentle';
    soundLevel: 'many' | 'moderate' | 'minimal';
  };
}

export const GamePresets: Record<string, GamePreset> = {
  platformer: {
    physics: {
      gravity: { x: 0, y: 980 }
    },
    player: {
      speed: 200,
      jumpHeight: 400,
      health: 3
    },
    camera: {
      lerp: 0.1,
      deadzone: 50,
      smooth: true
    },
    polish: {
      screenShake: true,
      particles: true,
      tweenStyle: 'aggressive',
      soundLevel: 'many'
    }
  },
  
  shooter: {
    physics: {
      gravity: { x: 0, y: 0 }
    },
    player: {
      speed: 300,
      fireRate: 100,
      health: 100
    },
    camera: {
      smooth: true,
      zoom: 1
    },
    polish: {
      screenShake: true,
      particles: true,
      tweenStyle: 'aggressive',
      soundLevel: 'many'
    }
  },
  
  puzzle: {
    physics: {
      gravity: { x: 0, y: 0 }
    },
    player: {
      speed: 0
    },
    camera: {
      smooth: false,
      zoom: 1
    },
    polish: {
      screenShake: false,
      particles: 'subtle',
      tweenStyle: 'smooth',
      soundLevel: 'moderate'
    }
  },
  
  rpg: {
    physics: {
      gravity: { x: 0, y: 0 }
    },
    player: {
      speed: 150,
      health: 100
    },
    camera: {
      lerp: 0.08,
      smooth: true,
      zoom: 2
    },
    polish: {
      screenShake: false,
      particles: 'subtle',
      tweenStyle: 'smooth',
      soundLevel: 'moderate'
    }
  },
  
  racing: {
    physics: {
      gravity: { x: 0, y: 0 }
    },
    player: {
      speed: 400
    },
    camera: {
      lerp: 0.15,
      smooth: true
    },
    polish: {
      screenShake: true,
      particles: true,
      tweenStyle: 'aggressive',
      soundLevel: 'many'
    }
  },
  
  zen: {
    physics: {
      gravity: { x: 0, y: 100 }
    },
    player: {
      speed: 100
    },
    camera: {
      lerp: 0.05,
      smooth: true,
      zoom: 1
    },
    polish: {
      screenShake: false,
      particles: false,
      tweenStyle: 'gentle',
      soundLevel: 'minimal'
    }
  }
};

/**
 * Detect game type from description
 */
export function detectGameType(description: string): string {
  const desc = description.toLowerCase();
  
  const patterns: Record<string, string[]> = {
    platformer: ['platform', 'jump', 'mario', 'sonic', 'metroidvania'],
    shooter: ['shoot', 'gun', 'bullet', 'space', 'shmup', 'nave'],
    puzzle: ['puzzle', 'match', 'tetris', 'candy', 'quebra'],
    rpg: ['rpg', 'adventure', 'quest', 'inventory', 'dungeon'],
    racing: ['race', 'racing', 'car', 'speed', 'corrida'],
    zen: ['zen', 'calm', 'relax', 'meditation', 'peaceful']
  };
  
  for (const [type, keywords] of Object.entries(patterns)) {
    if (keywords.some(keyword => desc.includes(keyword))) {
      return type;
    }
  }
  
  // Default to platformer as it's most versatile
  return 'platformer';
}

/**
 * Get preset for game type
 */
export function getGamePreset(gameType: string): GamePreset {
  return GamePresets[gameType] || GamePresets.platformer;
}