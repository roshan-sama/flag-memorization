// types.ts
import type { ReactNode } from "react";

export type FlagRegion = {
  id: string;
  color: string | null;
  path: string;
  correctColor?: string; // The expected color for validation
};

export type FlagOutline = {
  id: string;
  svg: ReactNode;
  isCorrect: boolean;
};

export type FlagDefinition = {
  regions: FlagRegion[];
  name: string;
  outlineOptions: FlagOutline[];
  completeOutlinePath: string; // Black outline for the coloring stage
};

export type GameStage = "outline" | "coloring" | "complete";

export type GameState = {
  currentFlag: FlagDefinition;
  stage: GameStage;
  selectedColor: string | null;
  selectedRegion: string | null;
  feedback: string | null;
  outlineAttempts: number;
};

export const FLAG_COLORS = [
  { name: "Red", value: "#FF0000" },
  { name: "Blue", value: "#0000FF" },
  { name: "White", value: "#FFFFFF" },
  { name: "Yellow", value: "#FFD700" },
  { name: "Green", value: "#008000" },
  { name: "Black", value: "#000000" },
  { name: "Orange", value: "#FFA500" },
  { name: "Purple", value: "#800080" },
  { name: "Brown", value: "#8B4513" },
  { name: "Grey", value: "#808080" },
  { name: "Gold", value: "#FFD700" },
  { name: "Dark Green", value: "#006400" },
  { name: "Light Blue", value: "#87CEEB" },
];
