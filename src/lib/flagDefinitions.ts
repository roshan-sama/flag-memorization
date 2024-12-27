// flagDefinitions.ts
import { FlagDefinition } from "../types";

export const FLAGS: Record<string, FlagDefinition> = {
  Japan: {
    name: "Japan",
    regions: [
      {
        id: "background",
        color: null,
        path: "M0,0 h300 v200 h-300 Z",
      },
      {
        id: "circle",
        color: null,
        path: "M150,100 m-60,0 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0",
      },
    ],
  },
  France: {
    name: "France",
    regions: [
      {
        id: "left",
        color: null,
        path: "M0,0 h100 v200 h-100 Z",
      },
      {
        id: "middle",
        color: null,
        path: "M100,0 h100 v200 h-100 Z",
      },
      {
        id: "right",
        color: null,
        path: "M200,0 h100 v200 h-100 Z",
      },
    ],
  },
  Australia: {
    name: "Australia",
    regions: [
      {
        id: "background",
        color: null,
        path: "M0,0 h300 v200 h-300 Z",
      },
      {
        id: "union_jack_bg",
        color: null,
        path: "M0,0 h150 v100 h-150 Z",
      },
      {
        id: "star1",
        color: null,
        path: "M250,50 l-10,-3 l8,-7 l-10,1 l3,-10 l-7,8 l1,-10 l-3,8 l-7,-8 l1,10 l-7,-8 l3,10 l-10,-1 l8,7 l-10,3 l10,3 l-8,7 l10,-1 l-3,10 l7,-8 l-1,10 l3,-8 l7,8 l-1,-10 l7,8 l-3,-10 l10,1 l-8,-7 Z",
      },
      {
        id: "star2",
        color: null,
        path: "M250,150 l-7,-7 l8,-1 l-7,-7 l8,1 l-3,-8 l7,4 l1,-8 l4,7 l4,-7 l1,8 l7,-4 l-3,8 l8,-1 l-7,7 l8,1 l-7,7 l3,8 l-7,-4 l-1,8 l-4,-7 l-4,7 l-1,-8 l-7,4 Z",
      },
    ],
  },
};
