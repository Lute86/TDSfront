// import { useState, useEffect } from 'react';

// function App() {
//   const [pokemons, setPokemons] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [flippedIndices, setFlippedIndices] = useState([]);
//   const [matchedPairs, setMatchedPairs] = useState([]);
//   const [attempts, setAttempts] = useState(0);

//   // Obtener 8 Pokémon aleatorios de la PokeAPI
//   useEffect(() => {
//     const fetchPokemons = async () => {
//       const randomIds = Array.from({ length: 8 }, () => Math.floor(Math.random() * 150) + 1);
//       const pokemonPromises = randomIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));
//       const pokemonsData = await Promise.all(pokemonPromises);
//       setPokemons(pokemonsData);
//     };
//     fetchPokemons();
//   }, []);

//   // Crear el tablero de cartas (16 cartas: 8 pares)
//   useEffect(() => {
//     if (pokemons.length > 0) {
//       const pairs = [...pokemons, ...pokemons];
//       const shuffledPairs = pairs.sort(() => Math.random() - 0.5);
//       setCards(shuffledPairs);
//     }
//   }, [pokemons]);

//   // Manejar el clic en una carta
//   const handleCardClick = (index) => {
//     if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(index)) {
//       setFlippedIndices([...flippedIndices, index]);
//     }
//   };

//   // Verificar si las cartas volteadas son iguales
//   useEffect(() => {
//     if (flippedIndices.length === 2) {
//       const [firstIndex, secondIndex] = flippedIndices;
//       if (cards[firstIndex].id === cards[secondIndex].id) {
//         setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
//       }
//       setAttempts(attempts + 1);
//       setTimeout(() => setFlippedIndices([]), 1000);
//     }
//   }, [flippedIndices]);

//   // Verificar si el juego ha terminado
//   const isGameOver = matchedPairs.length === cards.length;

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>Juego de Memoria Pokémon</h1>
//       <p>Intentos: {attempts}</p>
//       {isGameOver && <p>¡Felicidades! Has encontrado todos los pares.</p>}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '500px', margin: '0 auto' }}>
//         {cards.map((pokemon, index) => (
//           <div
//             key={index}
//             onClick={() => handleCardClick(index)}
//             style={{
//               width: '100px',
//               height: '100px',
//               backgroundColor: '#f0f0f0',
//               borderRadius: '10px',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               cursor: 'pointer',
//               backgroundImage: flippedIndices.includes(index) || matchedPairs.includes(index) ? `url(${pokemon.sprites.front_default})` : 'none',
//               backgroundSize: 'contain',
//               backgroundRepeat: 'no-repeat',
//               backgroundPosition: 'center',
//             }}
//           >
//             {!flippedIndices.includes(index) && !matchedPairs.includes(index) && <span>?</span>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState } from 'react';
import { usePokemonGame } from './hooks/usePokemonGame';
import GameBoard from './components/GameBoard';

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
      {isGameLost && <p style={{ color: 'red' }}>Fin del juego. Superaste el máximo de fallos.</p>}

      <GameBoard cards={cards} flipped={flipped} matched={matched} handleFlip={handleFlip} />
    </div>
  );
}

export default App;
