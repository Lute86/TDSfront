import { useState, useEffect } from 'react';

export function usePokemonGame({ pairsCount = 8, maxFails = null }) {
  const [pokemons, setPokemons] = useState([]);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [fails, setFails] = useState(0);

  // Obtener pokémon aleatorios
  useEffect(() => {
    const fetchPokemons = async () => {
      const randomIds = Array.from({ length: pairsCount }, () => Math.floor(Math.random() * 150) + 1);
      const data = await Promise.all(randomIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())));
      setPokemons(data);
    };
    fetchPokemons();
  }, [pairsCount]);

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

  const handleFlip = index => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index))
      setFlipped([...flipped, index]);
  };

  const resetGame = () => {
    setPokemons([]);
    setCards([]);
    setMatched([]);
    setFlipped([]);
    setAttempts(0);
    setFails(0);
  };

  const isGameOver = matched.length === cards.length && cards.length > 0;
  const isGameLost = maxFails !== null && fails >= maxFails;

  return { cards, flipped, matched, attempts, fails, isGameOver, isGameLost, handleFlip, resetGame };
}
