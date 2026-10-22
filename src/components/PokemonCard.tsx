import type { Pokemon } from "../data";
import { spriteUrl } from "../data";
import type { Build } from "../game";
import { buildLabel, classify } from "../game";
import { StatBar } from "./StatBar";

type Props = {
  pokemon: Pokemon;
  guess: Build | null; // null while the card is still face-down
};

// a flip card: sprite only on the front, stats and the answer on the back
export function PokemonCard({ pokemon, guess }: Props) {
  const revealed = guess !== null;
  const answer = classify(pokemon);
  const correct = guess === answer;

  return (
    <div className={`card ${revealed ? "revealed" : ""}`}>
      <div className="card-inner">
        <div className="card-face card-front">
          <img src={spriteUrl(pokemon.id)} alt="Mystery Pokémon" />
          <p className="muted">Who is this? Guess the build.</p>
        </div>

        <div className={`card-face card-back ${correct ? "right" : "wrong"}`}>
          <img src={spriteUrl(pokemon.id)} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <span className={`type type-${pokemon.type.toLowerCase()}`}>
            {pokemon.type}
          </span>
          <div className="stats">
            <StatBar label="HP" value={pokemon.hp} kind="hp" />
            <StatBar label="Attack" value={pokemon.attack} kind="attack" />
          </div>
          {revealed && (
            <p className="verdict">
              {correct ? "Correct!" : `Not quite, you said ${buildLabel(guess)}.`}{" "}
              {pokemon.name} is <strong>{buildLabel(answer).toLowerCase()}</strong>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
