import { spriteUrl } from "../data";
import type { Result } from "../game";
import { buildLabel, classify } from "../game";

type Props = { results: Result[]; onRestart: () => void };

// end screen: final score and a grid of every card with the guess made
export function Summary({ results, onRestart }: Props) {
  const score = results.filter((r) => r.correct).length;
  return (
    <section className="summary">
      <h2>
        You scored {score} out of {results.length}
      </h2>
      <p className="muted">
        Tank: HP at least 1.3× attack. Glass cannon: attack at least 1.3× HP.
        Anything closer is balanced.
      </p>
      <button type="button" className="restart" onClick={onRestart}>
        Play again
      </button>
      <ul className="grid">
        {results.map(({ pokemon, guess, correct }) => (
          <li key={pokemon.id} className={`tile ${correct ? "right" : "wrong"}`}>
            <img src={spriteUrl(pokemon.id)} alt={pokemon.name} />
            <strong>{pokemon.name}</strong>
            <span className="tile-stats">
              HP {pokemon.hp} · ATK {pokemon.attack}
            </span>
            <span className="tile-build">{buildLabel(classify(pokemon))}</span>
            {!correct && (
              <span className="tile-guess">
                you said {buildLabel(guess).toLowerCase()}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
