// types.ts
export type FlagRegion = {
  id: string;
  color: string | null;
  path: string;
};

export type FlagDefinition = {
  regions: FlagRegion[];
  name: string;
};

export type GameState = {
  currentFlag: FlagDefinition;
  selectedColor: string | null;
  selectedRegion: string | null;
  feedback: string | null;
  isComplete: boolean;
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
];
