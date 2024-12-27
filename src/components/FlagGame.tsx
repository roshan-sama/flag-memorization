// FlagGame.tsx
import React, { useState } from "react";
import { Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ColorPicker } from "./ColorPicker";
import { ColorableFlag } from "./ColorableFlag";
import { FlagOutlineSelector } from "./FlagOutlineSelector";
import { FLAGS } from "../lib/flagDefinitions";
import type { GameState, GameStage, FlagDefinition } from "../types";

const FlagGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentFlag: FLAGS["Japan"],
    stage: "outline",
    selectedColor: null,
    selectedRegion: null,
    feedback: null,
    outlineAttempts: 0,
  });

  const startGame = () => {
    const countries = Object.keys(FLAGS);
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];

    setGameState({
      currentFlag: FLAGS[randomCountry],
      stage: "outline",
      selectedColor: null,
      selectedRegion: null,
      feedback: null,
      outlineAttempts: 0,
    });
    setGameStarted(true);
  };

  const handleOutlineSelect = (outlineId: string) => {
    const selectedOption = gameState.currentFlag.outlineOptions.find(
      (option) => option.id === outlineId
    );

    if (selectedOption?.isCorrect) {
      setGameState({
        ...gameState,
        stage: "coloring",
        feedback: "Correct! Now color the flag.",
      });
    } else {
      setGameState({
        ...gameState,
        outlineAttempts: gameState.outlineAttempts + 1,
        feedback: "Incorrect outline. Try again.",
      });
    }
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

  const checkColors = () => {
    const allCorrect = gameState.currentFlag.regions.every(
      (region) => region.color === region.correctColor
    );

    if (allCorrect) {
      setGameState({
        ...gameState,
        stage: "complete",
        feedback: "Congratulations! You've completed the flag correctly!",
      });
    } else {
      setGameState({
        ...gameState,
        feedback: "Some colors are incorrect. Try again!",
      });
    }
  };

  const renderGameContent = () => {
    if (gameState.stage === "outline") {
      return (
        <FlagOutlineSelector
          flag={gameState.currentFlag}
          onOutlineSelect={handleOutlineSelect}
        />
      );
    }

    if (gameState.stage === "coloring") {
      return (
        <>
          <ColorableFlag
            flag={gameState.currentFlag}
            onRegionClick={handleRegionClick}
            selectedRegion={gameState.selectedRegion}
          />

          <div className="space-y-4">
            <ColorPicker
              selectedColor={gameState.selectedColor}
              onColorSelect={handleColorSelect}
            />
            <Button
              onClick={checkColors}
              className="w-full"
              variant="secondary"
            >
              <Check className="mr-2 h-5 w-5" />
              Check Colors
            </Button>
          </div>
        </>
      );
    }

    if (gameState.stage === "complete") {
      return (
        <div className="text-center">
          <ColorableFlag
            flag={gameState.currentFlag}
            onRegionClick={() => {}}
            selectedRegion={null}
          />
          <Button onClick={startGame} className="mt-8" size="lg">
            Next Flag
          </Button>
        </div>
      );
    }
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
            {gameState.stage === "outline"
              ? "Select the correct flag outline:"
              : "Color the flag of:"}
          </h2>
          <p className="text-4xl font-bold text-center">
            {gameState.currentFlag.name}
          </p>
        </Card>

        {gameState.feedback && (
          <Alert
            variant={
              gameState.feedback.includes("Correct") ? "default" : "destructive"
            }
          >
            <AlertDescription>{gameState.feedback}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8">{renderGameContent()}</div>
      </div>
    </div>
  );
};

export default FlagGame;
