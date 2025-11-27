import { useState } from 'react';
import { usePokemonGame } from './hooks/usePokemonGame';
import GameBoard from './components/GameBoard';
import "./styles/Pokeball.css"

function App() {
  const [difficulty, setDifficulty] = useState({ pairs: 8, maxFails: null });
  const { cards, flipped, matched, attempts, fails, isGameOver, isGameLost, handleFlip, resetGame } =
    usePokemonGame({ pairsCount: difficulty.pairs, maxFails: difficulty.maxFails });

  const handleDifficultyChange = (level) => {
    if (level === 'easy') setDifficulty({ pairs: 6, maxFails: null });
    if (level === 'medium') setDifficulty({ pairs: 8, maxFails: 10 });
    if (level === 'hard') setDifficulty({ pairs: 10, maxFails: 5 });
    resetGame();
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>Juego de Memoria Pokémon</h1>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => handleDifficultyChange('easy')}>Fácil</button>
        <button onClick={() => handleDifficultyChange('medium')}>Medio</button>
        <button onClick={() => handleDifficultyChange('hard')}>Difícil</button>
        <button onClick={resetGame}>Reiniciar</button>
      </div>
      <p>Intentos: {attempts} | Fallos: {fails}</p>

      {isGameOver && <p style={{ color: 'green' }}>¡Ganaste!</p>}
      {isGameLost && <p style={{ color: 'red' }}>Fin del juego. Superaste el máximo de fallos. REINICIANDO JUEGO</p>}
      
      <GameBoard cards={cards} flipped={flipped} matched={matched} handleFlip={handleFlip} />
    </div>
  );
}

export default App;
