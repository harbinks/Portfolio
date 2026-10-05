import { useState, useEffect, useCallback, useRef } from 'react';

interface CoffeeGameProps {
  onClose: () => void;
}

const GAME_DURATION = 30;

export function CoffeeGame({ onClose }: CoffeeGameProps) {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [coffeePos, setCoffeePos] = useState({ x: 40, y: 40 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveCoffee = useCallback(() => {
    setCoffeePos({
      x: 10 + Math.random() * 70,
      y: 10 + Math.random() * 65,
    });
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
    moveCoffee();
  }, [moveCoffee]);

  const catchCoffee = useCallback(() => {
    if (gameState !== 'playing') return;
    setScore(s => s + 1);
    moveCoffee();
  }, [gameState, moveCoffee]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameState('over');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="screen-view coffee-game">
      {/* Window title bar */}
      <div className="screen-window-title-bar">
        <button className="window-close-btn" onClick={onClose} aria-label="Close">×</button>
        <span className="window-title">☕ Catch the Coffee</span>
      </div>

      {/* Game HUD */}
      <div className="coffee-hud">
        <span className="coffee-hud-item">Score: <strong>{score}</strong></span>
        <span className="coffee-hud-item">Time: <strong>{timeLeft}s</strong></span>
      </div>

      {/* Game area */}
      <div className="coffee-arena" ref={containerRef}>
        {gameState === 'idle' && (
          <div className="coffee-center-msg">
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>☕</div>
            <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-terminal-dim)' }}>
              Catch as many coffees as you can in {GAME_DURATION}s!
            </div>
            <button className="coffee-btn" onClick={startGame}>▶ Start Game</button>
          </div>
        )}

        {gameState === 'playing' && (
          <button
            className="coffee-target"
            onClick={catchCoffee}
            style={{
              left: `${coffeePos.x}%`,
              top: `${coffeePos.y}%`,
            }}
            aria-label="Catch the coffee"
          >
            ☕
          </button>
        )}

        {gameState === 'over' && (
          <div className="coffee-center-msg">
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏆</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--computer-screen-text)', marginBottom: '4px' }}>
              Game Over!
            </div>
            <div style={{ fontSize: '24px', fontFamily: 'var(--font-mono)', color: 'var(--accent-terminal)', marginBottom: '12px' }}>
              {score} ☕ caught
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-terminal-dim)', marginBottom: '12px' }}>
              {score >= 20 ? '☕ Caffeine Legend!' : score >= 12 ? '👏 Coffee Enthusiast!' : score >= 6 ? '👍 Not bad!' : '🫠 Need more practice!'}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button className="coffee-btn" onClick={startGame}>↻ Play Again</button>
              <button className="coffee-btn coffee-btn-dim" onClick={onClose}>✕ Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
