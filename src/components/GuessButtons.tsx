import type { Build } from "../game";
import { BUILDS } from "../game";

type Props = { onGuess: (b: Build) => void; disabled: boolean };

// one button per build, with the rule of thumb as a hint underneath
export function GuessButtons({ onGuess, disabled }: Props) {
  return (
    <div className="guesses">
      {BUILDS.map((b) => (
        <button
          key={b.key}
          type="button"
          className={`guess guess-${b.key}`}
          disabled={disabled}
          onClick={() => onGuess(b.key)}
        >
          <span className="guess-label">{b.label}</span>
          <span className="guess-hint">{b.hint}</span>
        </button>
      ))}
    </div>
  );
}
