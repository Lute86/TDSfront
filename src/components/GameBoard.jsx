import Card from './Card';

export default function GameBoard({ cards, flipped, matched, handleFlip }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10,
        maxWidth: 500,
        margin: '20px auto',
      }}
    >
      {cards.map((card, i) => (
        <Card
          key={i}
          flipped={flipped.includes(i)}
          matched={matched.includes(i)}
          image={card.sprites.front_default}
          onClick={() => handleFlip(i)}
        />
      ))}
    </div>
  );
}
