# Guess the build

My Module B project for the [D3 ❤️ React course](https://www.react-graph-gallery.com/react-d3-dataviz-course):
a small React game over 20 Pokémon.

Live at <https://j-sirgo.github.io/pokemon-cards/>.

## The game

A Pokémon's sprite is shown as a silhouette. Guess whether it is a **tank**, a **glass
cannon**, or **balanced**. The card flips to reveal its name, type, HP and attack bars,
and the answer. Score out of 20, with a summary grid at the end.

The rule of thumb: HP at least 1.3× attack is a tank, attack at least 1.3× HP is a glass
cannon, anything closer is balanced. That gives 3 tanks, 7 glass cannons, and 10 balanced.
The dataset has no Defense stat, so "tank" here means HP versus attack only.

## Code map

- `src/data.ts`: the dataset, the `Pokemon` type, and the sprite URL helper
- `src/game.ts`: the `Build` type, the 1.3 rule (`classify`), and a shuffle
- `src/components/`: `PokemonCard` (flip card), `StatBar`, `GuessButtons`, `Progress`, `Summary`
- `src/App.tsx`: game state (shuffled deck, current index, current guess, results)

## Run

```
npm install
npm run dev
```

## Deploy

```
npm run deploy
```

Builds the app and pushes `dist/` to the `gh-pages` branch. Commit and push the source to `main`
separately.
