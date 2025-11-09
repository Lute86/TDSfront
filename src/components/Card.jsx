export default function Card({ flipped, matched, image, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      aria-label="Carta Pokémon"
      style={{
        width: 100,
        height: 100,
        backgroundColor: flipped || matched ? '#fff' : '#ccc',
        backgroundImage: flipped || matched ? `url(${image})` : 'none',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: 10,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
        transform: flipped || matched ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {!flipped && !matched && <span style={{ fontSize: 24 }}>?</span>}
    </div>
  );
}
