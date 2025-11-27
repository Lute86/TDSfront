import { useState, useEffect } from 'react';
import { generateUniqueIds } from '../utils/generateUniqueIds';

export function usePokemonGame({ pairsCount = 8, maxFails = null }) {
  const [pokemons, setPokemons] = useState([]);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [fails, setFails] = useState(0);
  const [loading, setLoading] = useState(true);

  const [reloadToken, setReloadToken] = useState(0); // <- fuerza reload al reset

  // Obtener pokémon aleatorios
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);

      const randomIds = generateUniqueIds(pairsCount);

      const data = await Promise.all(
        randomIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        )
      );

      const optimized = data.map(poke => ({
        id: poke.id,
        name: poke.name,
        image: poke.sprites.other['official-artwork'].front_default,
      }));

      setPokemons(optimized);
      setLoading(false);
    };

    fetchPokemons();
  }, [pairsCount, reloadToken]);


  // Duplicar y barajar
  useEffect(() => {
    if (pokemons.length > 0) {
      const shuffled = [...pokemons, ...pokemons].sort(() => Math.random() - 0.5);
      setCards(shuffled);
    }
  }, [pokemons]);

  // Lógica de coincidencias
  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      const match = cards[a].id === cards[b].id;

      if (match) setMatched(prev => [...prev, a, b]);
      else setFails(f => f + 1);

      setAttempts(a => a + 1);

      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped]);

  // Fin del juego por fallos
  useEffect(() => {
    if (maxFails !== null && fails >= maxFails) {
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  }, [fails, maxFails]);

  const handleFlip = index => {
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(index)
    ) {
      setFlipped([...flipped, index]);
    }
  };

  const resetGame = () => {
    setMatched([]);
    setFlipped([]);
    setAttempts(0);
    setFails(0);

    // fuerza a useEffect a recargar pokemons
    setReloadToken(t => t + 1);
  };

  const isGameOver = matched.length === cards.length && cards.length > 0;
  const isGameLost = maxFails !== null && fails >= maxFails;

  return {
    cards,
    flipped,
    matched,
    attempts,
    fails,
    loading,
    isGameOver,
    isGameLost,
    handleFlip,
    resetGame,
  };
}
