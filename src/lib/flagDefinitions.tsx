// flagDefinitions.tsx
import { FlagDefinition } from "../types";

export const FLAGS: Record<string, FlagDefinition> = {
  // Region Asia-Pacific
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
  // Region Europe
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
  // Region Africa
  Algeria: {
    name: "Algeria",
    completeOutlinePath: "M0,0 h300 v200 h-300 Z",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M193.3 75a50 50 0 1 0 0 50 40 40 0 1 1 0-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M195.23 100 150 85.31l27.95 38.47v-47.55L150 114.69z"
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
              d="M193.3 100a50 50 0 1 0 0 50 40 40 0 1 1 0-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M195.23 125 150 110.31l27.95 38.47v-47.55L150 139.69z"
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
              cx="175"
              cy="100"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M175 70l15 45-40-29h50l-40 29z"
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
        path: "M0,0 h150 v200 h-150 Z",
        correctColor: "#006400", // Dark green
      },
      {
        id: "right",
        color: null,
        path: "M150,0 h150 v200 h-150 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "emblem",
        color: null,
        path: "M193.3 75a50 50 0 1 0 0 50 40 40 0 1 1 0-50M195.23 100 150 85.31l27.95 38.47v-47.55L150 114.69z",
        correctColor: "#FF0000", // Proper red
      },
    ],
  },

  // Angola: {
  //   name: "Angola",
  //   completeOutlinePath:
  //     "M0,0 h300 v200 h-300 Z M150,75 l-20,40 l-20,-40 h15 v-15 h10 v15 h15",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M150,75 l-20,40 l-20,-40 h15 v-15 h10 v15 h15 M150,100 m-15,0 l30,0 l-15,25 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M150,100 l-25,50 l-25,-50 h20 v-20 h10 v20 h20"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <circle
  //             cx="150"
  //             cy="100"
  //             r="30"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "top",
  //       color: null,
  //       path: "M0,0 h300 v100 h-300 Z",
  //       correctColor: "#FF0000",
  //     },
  //     {
  //       id: "bottom",
  //       color: null,
  //       path: "M0,100 h300 v100 h-300 Z",
  //       correctColor: "#000000",
  //     },
  //     {
  //       id: "emblem",
  //       color: null,
  //       path: "M150,75 l-20,40 l-20,-40 h15 v-15 h10 v15 h15 M150,100 m-15,0 l30,0 l-15,25 z",
  //       correctColor: "#FFD700",
  //     },
  //   ],
  // },

  // Benin: {
  //   name: "Benin",
  //   completeOutlinePath: "M0,0 h300 v200 h-300 Z M100,0 L100,200",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M100,0 L100,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M150,0 L150,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,100 L300,100"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "left",
  //       color: null,
  //       path: "M0,0 h100 v200 h-100 Z",
  //       correctColor: "#008000",
  //     },
  //     {
  //       id: "right",
  //       color: null,
  //       path: "M100,0 h200 v200 h-200 Z",
  //       correctColor: "#FFD700",
  //     },
  //   ],
  // },

  // Botswana: {
  //   name: "Botswana",
  //   completeOutlinePath: "M0,0 h300 v200 h-300 Z M0,80 L300,80 M0,120 L300,120",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,80 L300,80 M0,120 L300,120"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,67 L300,67 M0,133 L300,133"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M100,0 L100,200 M200,0 L200,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "background",
  //       color: null,
  //       path: "M0,0 h300 v200 h-300 Z",
  //       correctColor: "#87CEEB",
  //     },
  //     {
  //       id: "middle",
  //       color: null,
  //       path: "M0,80 h300 v40 h-300 Z",
  //       correctColor: "#000000",
  //     },
  //     {
  //       id: "white-stripes",
  //       color: null,
  //       path: "M0,85 h300 v5 h-300 Z M0,110 h300 v5 h-300 Z",
  //       correctColor: "#FFFFFF",
  //     },
  //   ],
  // },

  // "Burkina Faso": {
  //   name: "Burkina Faso",
  //   completeOutlinePath:
  //     "M0,0 h300 v200 h-300 Z M150,50 l15,45 l-40,-29 h50 l-40,29 z",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M150,50 l15,45 l-40,-29 h50 l-40,29 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M150,75 l20,60 l-53,-38 h66 l-53,38 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <circle
  //             cx="150"
  //             cy="100"
  //             r="30"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "top",
  //       color: null,
  //       path: "M0,0 h300 v100 h-300 Z",
  //       correctColor: "#FF0000",
  //     },
  //     {
  //       id: "bottom",
  //       color: null,
  //       path: "M0,100 h300 v100 h-300 Z",
  //       correctColor: "#008000",
  //     },
  //     {
  //       id: "star",
  //       color: null,
  //       path: "M150,50 l15,45 l-40,-29 h50 l-40,29 z",
  //       correctColor: "#FFD700",
  //     },
  //   ],
  // },

  // "South Africa": {
  //   name: "South Africa",
  //   completeOutlinePath:
  //     "M0,0 h300 v200 h-300 Z M0,33 L300,33 M0,167 L300,167 M75,0 L225,100 L75,200",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,33 L300,33 M0,167 L300,167 M75,0 L225,100 L75,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,50 L300,50 M0,150 L300,150 M100,0 L200,100 L100,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,67 L300,67 M0,133 L300,133 M50,0 L250,100 L50,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "top",
  //       color: null,
  //       path: "M0,0 h300 v33 h-300 Z",
  //       correctColor: "#FF0000",
  //     },
  //     {
  //       id: "bottom",
  //       color: null,
  //       path: "M0,167 h300 v33 h-300 Z",
  //       correctColor: "#0000FF",
  //     },
  //     {
  //       id: "middle",
  //       color: null,
  //       path: "M0,33 h300 v134 h-300 Z",
  //       correctColor: "#FFFFFF",
  //     },
  //     {
  //       id: "triangle",
  //       color: null,
  //       path: "M0,0 L75,100 L0,200 Z",
  //       correctColor: "#000000",
  //     },
  //     {
  //       id: "yellowStripe",
  //       color: null,
  //       path: "M75,0 L225,100 L75,200 h-25 L175,100 L50,200 Z",
  //       correctColor: "#FFD700",
  //     },
  //     {
  //       id: "greenStripe",
  //       color: null,
  //       path: "M50,0 L200,100 L50,200 h-25 L150,100 L25,200 Z",
  //       correctColor: "#008000",
  //     },
  //   ],
  // },

  // Kenya: {
  //   name: "Kenya",
  //   completeOutlinePath: "M0,0 h300 v200 h-300 Z M0,50 L300,50 M0,150 L300,150",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,50 L300,50 M0,150 L300,150"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M150,75 m-25,0 l50,25 l-50,25 l-50,-25 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,67 L300,67 M0,133 L300,133"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M150,100 m-20,0 l40,20 l-40,20 l-40,-20 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,40 L300,40 M0,160 L300,160"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="150"
  //             cy="100"
  //             r="30"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "top",
  //       color: null,
  //       path: "M0,0 h300 v50 h-300 Z",
  //       correctColor: "#000000",
  //     },
  //     {
  //       id: "middle",
  //       color: null,
  //       path: "M0,50 h300 v100 h-300 Z",
  //       correctColor: "#FF0000",
  //     },
  //     {
  //       id: "bottom",
  //       color: null,
  //       path: "M0,150 h300 v50 h-300 Z",
  //       correctColor: "#008000",
  //     },
  //     {
  //       id: "shield",
  //       color: null,
  //       path: "M150,75 m-25,0 l50,25 l-50,25 l-50,-25 z",
  //       correctColor: "#FFFFFF",
  //     },
  //   ],
  // },
};
