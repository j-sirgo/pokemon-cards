import type { Pokemon } from "./data";
import { pokemons } from "./data";

// the three builds a player can guess
export type Build = "tank" | "glass" | "balanced";

export type BuildInfo = { key: Build; label: string; hint: string };

export const BUILDS: BuildInfo[] = [
  { key: "tank", label: "Tank", hint: "HP ≥ 1.3× attack" },
  { key: "glass", label: "Glass cannon", hint: "Attack ≥ 1.3× HP" },
  { key: "balanced", label: "Balanced", hint: "Neither, within 1.3×" },
];

// rule of thumb: a ratio of 1.3 or more either way decides the build
export const RATIO = 1.3;

export const classify = (p: Pokemon): Build => {
  if (p.hp / p.attack >= RATIO) return "tank";
  if (p.attack / p.hp >= RATIO) return "glass";
  return "balanced";
};

export const buildLabel = (b: Build) =>
  BUILDS.find((info) => info.key === b)?.label ?? b;

// largest single stat in the dataset, so every bar shares one scale
export const MAX_STAT = Math.max(...pokemons.flatMap((p) => [p.hp, p.attack]));

// one round's outcome, kept for the final summary
export type Result = { pokemon: Pokemon; guess: Build; correct: boolean };

// fisher-yates shuffle returning a new array
export const shuffle = <T,>(items: T[]): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
