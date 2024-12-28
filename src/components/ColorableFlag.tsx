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
        {/* Colorable regions */}
        {flag.regions.map((region) => (
          <path
            key={region.id}
            d={region.path}
            fill={region.color || "#FFFFFF"} // Default to white
            stroke="black"
            strokeWidth="1"
            className="cursor-pointer transition-colors"
            onClick={() => onRegionClick(region.id)}
          />
        ))}
        {/* Complete outline - drawn last to ensure it's visible */}
        <path
          d={flag.completeOutlinePath}
          fill="none"
          stroke="black"
          strokeWidth="1"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};
