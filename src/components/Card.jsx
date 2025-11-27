import '../styles/Card.css';

export default function Card({ flipped, matched, image, onClick }) {
  const isFlipped = flipped || matched;

  return (
    <div className="card-container" onClick={onClick} role="button" aria-label="Carta Pokémon">

      <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>

        {/* Frente */}
        <div className="card-face card-front">
          <span className="text-2xl">?</span>
        </div>

        {/* Dorso con imagen */}
        <div className="card-face card-back">
          <img src={image} alt="pokemon" className="pokemon-img" />
        </div>

      </div>
    </div>
  );
}
