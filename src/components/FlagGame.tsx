// FlagGame.tsx
import React, { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ColorPicker } from "./ColorPicker";
import { ColorableFlag } from "./ColorableFlag";
import { FLAGS } from "../lib/flagDefinitions";
import type { FlagDefinition, GameState } from "../types";

const FlagGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentFlag: FLAGS["Japan"],
    selectedColor: null,
    selectedRegion: null,
    feedback: null,
    isComplete: false,
  });

  const startGame = () => {
    const countries = Object.keys(FLAGS);
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];

    setGameState({
      currentFlag: FLAGS[randomCountry],
      selectedColor: null,
      selectedRegion: null,
      feedback: null,
      isComplete: false,
    });
    setGameStarted(true);
  };

  const handleRegionClick = (regionId: string) => {
    if (!gameState.selectedColor) {
      setGameState({
        ...gameState,
        feedback: "Please select a color first",
        selectedRegion: regionId,
      });
      return;
    }

    const updatedFlag: FlagDefinition = {
      ...gameState.currentFlag,
      regions: gameState.currentFlag.regions.map((region) =>
        region.id === regionId
          ? { ...region, color: gameState.selectedColor }
          : region
      ),
    };

    setGameState({
      ...gameState,
      currentFlag: updatedFlag,
      selectedRegion: regionId,
      feedback: null,
    });
  };

  const handleColorSelect = (color: string) => {
    setGameState({
      ...gameState,
      selectedColor: color,
      feedback: null,
    });
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Card className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Flag Memorization Game
          </h1>
          <div className="flex justify-center">
            <Button onClick={startGame} size="lg">
              <Play className="mr-2 h-5 w-5" />
              Start Game
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-medium text-center mb-4">
            Color the flag of:
          </h2>
          <p className="text-4xl font-bold text-center">
            {gameState.currentFlag.name}
          </p>
        </Card>

        {gameState.feedback && (
          <Alert>
            <AlertDescription>{gameState.feedback}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8">
          <ColorableFlag
            flag={gameState.currentFlag}
            onRegionClick={handleRegionClick}
            selectedRegion={gameState.selectedRegion}
          />

          <ColorPicker
            selectedColor={gameState.selectedColor}
            onColorSelect={handleColorSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default FlagGame;
