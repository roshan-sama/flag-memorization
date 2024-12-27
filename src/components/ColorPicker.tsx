// ColorPicker.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Pipette } from "lucide-react";
import { FLAG_COLORS } from "../types";

interface ColorPickerProps {
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className="p-4 bg-background rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Pipette className="w-5 h-5" />
        <span className="font-medium">Select a color:</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {FLAG_COLORS.map((color) => (
          <Button
            key={color.value}
            variant={selectedColor === color.value ? "default" : "outline"}
            className="w-12 h-12 p-0"
            style={{ backgroundColor: color.value }}
            onClick={() => onColorSelect(color.value)}
          >
            <span className="sr-only">{color.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
