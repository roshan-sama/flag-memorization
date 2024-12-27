// ColorableFlag.tsx
import React from "react";
import { FlagDefinition } from "../types";

interface ColorableFlagProps {
  flag: FlagDefinition;
  onRegionClick: (regionId: string) => void;
  selectedRegion: string | null;
}

export const ColorableFlag: React.FC<ColorableFlagProps> = ({
  flag,
  onRegionClick,
  selectedRegion,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <svg
        viewBox="0 0 300 200"
        className="w-full h-full border-2 border-gray-300 rounded-lg"
      >
        {flag.regions.map((region) => (
          <path
            key={region.id}
            d={region.path}
            fill={region.color || "transparent"}
            stroke={selectedRegion === region.id ? "currentColor" : "#666"}
            strokeWidth={selectedRegion === region.id ? "3" : "1"}
            className="cursor-pointer transition-all hover:stroke-2"
            onClick={() => onRegionClick(region.id)}
          />
        ))}
      </svg>
    </div>
  );
};
