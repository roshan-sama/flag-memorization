// FlagOutlineSelector.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import type { FlagDefinition } from "../types";

interface FlagOutlineSelectorProps {
  flag: FlagDefinition;
  onOutlineSelect: (outlineId: string) => void;
}

export const FlagOutlineSelector: React.FC<FlagOutlineSelectorProps> = ({
  flag,
  onOutlineSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {flag.outlineOptions.map((option) => (
        <Card
          key={option.id}
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onOutlineSelect(option.id)}
        >
          <div className="aspect-[3/2] border-2 border-gray-200 rounded-lg">
            {option.svg}
          </div>
        </Card>
      ))}
    </div>
  );
};
