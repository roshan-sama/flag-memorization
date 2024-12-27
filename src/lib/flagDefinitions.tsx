// flagDefinitions.ts
import { FlagDefinition } from "../types";

export const FLAGS: Record<string, FlagDefinition> = {
  Japan: {
    name: "Japan",
    completeOutlinePath: "M0,0 h300 v200 h-300 Z",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="150"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="200"
              cy="70"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "background",
        color: null,
        path: "M0,0 h300 v200 h-300 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "circle",
        color: null,
        path: "M150,100 m-60,0 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0",
        correctColor: "#FF0000",
      },
    ],
  },
  France: {
    name: "France",
    completeOutlinePath:
      "M0,0 h300 v200 h-300 Z M100,0 L100,200 M200,0 L200,200",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M100,0 L100,200 M200,0 L200,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M0,67 L300,67 M0,133 L300,133"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M150,0 L150,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "left",
        color: null,
        path: "M0,0 h100 v200 h-100 Z",
        correctColor: "#0000FF",
      },
      {
        id: "middle",
        color: null,
        path: "M100,0 h100 v200 h-100 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "right",
        color: null,
        path: "M200,0 h100 v200 h-100 Z",
        correctColor: "#FF0000",
      },
    ],
  },
};
