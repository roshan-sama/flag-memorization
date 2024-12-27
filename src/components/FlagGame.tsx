import React, { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FlagOutline = React.ReactNode;

interface FlagOptions {
  [key: string]: FlagOutline[];
}

// Flag outline definitions using SVG
const flagOutlines: FlagOptions = {
  Japan: [
    // Circle in center - correct version
    <svg viewBox="0 0 300 200" className="w-full h-full" key="japan-1">
      <circle
        cx="150"
        cy="100"
        r="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Circle offset to left
    <svg viewBox="0 0 300 200" className="w-full h-full" key="japan-2">
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Two circles
    <svg viewBox="0 0 300 200" className="w-full h-full" key="japan-3">
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="100"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Circle in top right
    <svg viewBox="0 0 300 200" className="w-full h-full" key="japan-4">
      <circle
        cx="200"
        cy="70"
        r="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
  ],
  France: [
    // Vertical thirds - correct version
    <svg viewBox="0 0 300 200" className="w-full h-full" key="france-1">
      <path
        d="M100,0 L100,200 M200,0 L200,200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Horizontal thirds
    <svg viewBox="0 0 300 200" className="w-full h-full" key="france-2">
      <path
        d="M0,67 L300,67 M0,133 L300,133"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Diagonal stripes
    <svg viewBox="0 0 300 200" className="w-full h-full" key="france-3">
      <path
        d="M100,0 L150,200 M200,0 L250,200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Quarters
    <svg viewBox="0 0 300 200" className="w-full h-full" key="france-4">
      <path
        d="M150,0 L150,200 M0,100 L300,100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
  ],
  Australia: [
    // Union Jack area + stars outline - correct version
    <svg viewBox="0 0 300 200" className="w-full h-full" key="australia-1">
      <rect
        x="0"
        y="0"
        width="150"
        height="100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="50"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="100"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="150"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Similar but with different star positions
    <svg viewBox="0 0 300 200" className="w-full h-full" key="australia-2">
      <rect
        x="0"
        y="0"
        width="150"
        height="100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="50"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="100"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="150"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Stars only
    <svg viewBox="0 0 300 200" className="w-full h-full" key="australia-3">
      <circle
        cx="50"
        cy="50"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="50"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
    // Different arrangement
    <svg viewBox="0 0 300 200" className="w-full h-full" key="australia-4">
      <rect
        x="150"
        y="0"
        width="150"
        height="100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="50"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="150"
        cy="100"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="150"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>,
  ],
};

const countries = ["Japan", "France", "Australia"];

interface GameState {
  currentCountry: string;
  options: FlagOutline[];
  correctAnswer: number | null;
}

const FlagGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentCountry: "",
    options: [],
    correctAnswer: null,
  });
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const startGame = () => {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    const correctIndex = Math.floor(Math.random() * 4);

    // Get the correct outline and three random wrong ones
    const allOutlines = [...flagOutlines[randomCountry]];
    const selectedOptions = new Array(4).fill(null).map((_, index) => {
      if (index === correctIndex) {
        return allOutlines[0]; // The correct outline is always the first one
      }
      // Get a random wrong outline
      const randomIndex =
        Math.floor(Math.random() * (allOutlines.length - 1)) + 1;
      return allOutlines[randomIndex];
    });

    setGameState({
      currentCountry: randomCountry,
      options: selectedOptions,
      correctAnswer: correctIndex,
    });
    setGameStarted(true);
    setFeedback(null);
  };

  const handleOptionSelect = (index: number) => {
    if (index === gameState.correctAnswer) {
      setFeedback({
        message: "Correct! Moving to next flag...",
        type: "success",
      });
      setTimeout(startGame, 1500);
    } else {
      setFeedback({ message: "Incorrect. Try again!", type: "error" });
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
            Identify the flag of:
          </h2>
          <p className="text-4xl font-bold text-center">
            {gameState.currentCountry}
          </p>
        </Card>

        {feedback && (
          <Alert
            variant={feedback.type === "success" ? "default" : "destructive"}
          >
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gameState.options.map((option, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleOptionSelect(index)}
            >
              <div className="aspect-[3/2]">{option}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlagGame;
