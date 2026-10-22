import { useState } from "react";
import { pokemons } from "./data";
import type { Build, Result } from "./game";
import { classify, shuffle } from "./game";
import { GuessButtons } from "./components/GuessButtons";
import { PokemonCard } from "./components/PokemonCard";
import { Progress } from "./components/Progress";
import { Summary } from "./components/Summary";
import "./App.css";

function App() {
  // a fresh shuffled deck per game
  const [deck, setDeck] = useState(() => shuffle(pokemons));
  const [index, setIndex] = useState(0);
  // the current round's guess; null means the card is still face-down
  const [guess, setGuess] = useState<Build | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const total = deck.length;
  const score = results.filter((r) => r.correct).length;
  const finished = index >= total;

  const handleGuess = (b: Build) => {
    const pokemon = deck[index];
    setGuess(b);
    setResults([
      ...results,
      { pokemon, guess: b, correct: b === classify(pokemon) },
    ]);
  };

  const handleNext = () => {
    setGuess(null);
    setIndex(index + 1);
  };

  const handleRestart = () => {
    setDeck(shuffle(pokemons));
    setIndex(0);
    setGuess(null);
    setResults([]);
  };

  return (
    <>
      <header>
        <h1>Guess the build</h1>
        <p className="muted">
          I started this course knowing none of these Pokémon. Can you tell
          which are tanks, which are glass cannons, and which are balanced,
          by looks alone?
        </p>
        <p className="rule">
          A <strong>tank</strong> has much more HP than attack, a{" "}
          <strong>glass cannon</strong> the reverse, and{" "}
          <strong>balanced</strong> is anywhere in between. The cutoff is a
          1.3 ratio either way, a rule of thumb I chose for this set.
        </p>
      </header>

      {finished ? (
        <Summary results={results} onRestart={handleRestart} />
      ) : (
        <main className="game">
          <Progress round={index + 1} total={total} score={score} />
          <PokemonCard pokemon={deck[index]} guess={guess} />
          <GuessButtons onGuess={handleGuess} disabled={guess !== null} />
          {guess !== null && (
            <button type="button" className="next" onClick={handleNext}>
              {index + 1 === total ? "See results" : "Next card"}
            </button>
          )}
        </main>
      )}

      <footer className="muted">
        Builds use HP vs. attack only: the dataset has no Defense stat. Sprites
        from <a href="https://github.com/PokeAPI/sprites">PokeAPI</a>.
      </footer>
    </>
  );
}

export default App;
