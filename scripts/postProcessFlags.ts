// scripts/postProcessFlags.ts
import fs from "fs/promises";
import { join, dirname } from "path";

import { fileURLToPath } from "url";

//#region Flag Processing
// scripts/flagProcessor.ts
import { parseStringPromise } from "xml2js";
import { JSDOM } from "jsdom";

interface SVGElement {
  type: string;
  attributes: Record<string, string>;
  children?: SVGElement[];
}

interface ProcessedRegion {
  id: string;
  path: string;
  correctColor: string;
  complexity: number;
}

export async function processFlagSVG(svgContent: string) {
  const dom = new JSDOM(svgContent);
  const doc = dom.window.document;
  const svg = doc.querySelector("svg");

  if (!svg) throw new Error("Invalid SVG");

  // Get basic flag properties
  const viewBox = svg.getAttribute("viewBox")?.split(" ").map(Number);
  const aspectRatio = viewBox ? `${viewBox[2]}:${viewBox[3]}` : "3:2";

  // Process all SVG elements
  const elements = await extractSVGElements(svg);

  // Group elements by complexity
  const { simpleRegions, complexRegions } = categorizeRegions(elements);

  // Generate regions
  const regions = await processRegions(simpleRegions, complexRegions);

  // Generate outline options
  const outlineOptions = generateOutlineOptions(regions);

  return {
    aspectRatio,
    regions,
    outlineOptions,
    complexElements: complexRegions,
  };
}

async function extractSVGElements(svg: Element): Promise<SVGElement[]> {
  const elements: SVGElement[] = [];

  // Process each child element
  svg.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      // Element node
      const element = node as Element;
      const type = element.tagName.toLowerCase();

      // Get all attributes
      const attributes: Record<string, string> = {};
      element.getAttributeNames().forEach((name) => {
        attributes[name] = element.getAttribute(name) || "";
      });

      // Convert to standardized path if needed
      if (type !== "path") {
        attributes["d"] = convertToPath(type, attributes);
      }

      elements.push({
        type,
        attributes,
        children:
          element.childNodes.length > 0
            ? (extractSVGElements(element) as any)
            : undefined,
      });
    }
  });

  return elements;
}

function convertToPath(
  type: string,
  attributes: Record<string, string>
): string {
  switch (type) {
    case "rect":
      const { x = "0", y = "0", width, height } = attributes;
      return `M${x},${y} h${width} v${height} h-${width}Z`;

    case "circle":
      const { cx, cy, r } = attributes;
      if (!cx || !cy || !r) return "";
      const radius = Number(r);
      if (isNaN(radius)) return "";
      return `M${cx},${cy} m-${radius},0 a${radius},${radius} 0 1,0 ${
        radius * 2
      },0 a${radius},${radius} 0 1,0 -${radius * 2},0`;

    default:
      return "";
  }
}

function categorizeRegions(elements: SVGElement[]) {
  const simpleRegions: SVGElement[] = [];
  const complexRegions: SVGElement[] = [];

  elements.forEach((element) => {
    if (isComplexElement(element)) {
      complexRegions.push(element);
    } else {
      simpleRegions.push(element);
    }
  });

  return { simpleRegions, complexRegions };
}

function isComplexElement(element: SVGElement): boolean {
  // Check path complexity
  const pathCommands =
    (element.attributes["d"] || "").match(/[MLHVCSQTAZ]/gi) || [];
  if (pathCommands.length > 10) return true;

  // Check for common complex elements
  const id = element.attributes["id"]?.toLowerCase() || "";
  const complexPatterns = [
    /emblem/i,
    /coat.*arms/i,
    /seal/i,
    /union.*jack/i,
    /eagle/i,
    /lion/i,
    /dragon/i,
    /bird/i,
  ];

  return complexPatterns.some((pattern) => pattern.test(id));
}

async function processRegions(
  simpleRegions: SVGElement[],
  complexRegions: SVGElement[]
): Promise<ProcessedRegion[]> {
  const regions: ProcessedRegion[] = [];

  // Process simple regions
  simpleRegions.forEach((element, index) => {
    regions.push({
      id: element.attributes["id"] || `region_${index}`,
      path: element.attributes["d"],
      correctColor: extractColor(element),
      complexity: 1,
    });
  });

  // Process complex regions as pre-colored
  complexRegions.forEach((element, index) => {
    regions.push({
      id: element.attributes["id"] || `complex_${index}`,
      path: element.attributes["d"],
      correctColor: extractColor(element),
      complexity: 3,
    });
  });

  return regions;
}

function extractColor(element: SVGElement): string {
  // Try to get color from fill or stroke
  const fill = element.attributes["fill"];
  const stroke = element.attributes["stroke"];

  if (fill && fill !== "none") return fill;
  if (stroke && stroke !== "none") return stroke;

  return "#FFFFFF"; // Default to white
}

function generateOutlineOptions(regions: ProcessedRegion[]) {
  const baseOutline = regions.map((r) => r.path).join(" ");

  // Generate variations
  return [
    {
      id: "correct",
      svg: baseOutline,
      isCorrect: true,
    },
    // Generate mirrored version
    {
      id: "mirrored",
      svg: mirrorPath(baseOutline),
      isCorrect: false,
    },
    // Generate rotated version
    {
      id: "rotated",
      svg: rotatePath(baseOutline),
      isCorrect: false,
    },
  ];
}

// Update the mirroring and rotation functions
function mirrorPath(path: string): string {
  if (!path) return path;

  // Preserve original commands while transforming coordinates
  const commands = path.split(/(?=[MmLlHhVvCcSsQqTtAaZz])/);

  return commands
    .map((command) => {
      const type = command[0];
      const coords = command.slice(1).trim();

      if (!coords) return command;

      // Split coordinates into pairs
      const pairs = coords.split(/[\s,]+/);
      const newPairs = [];

      for (let i = 0; i < pairs.length; i += 2) {
        if (pairs[i] === undefined) break;

        const x = parseFloat(pairs[i]);
        const y = pairs[i + 1] ? parseFloat(pairs[i + 1]) : null;

        if (isNaN(x)) continue;

        // Mirror x coordinate
        const newX = 300 - x;
        newPairs.push(newX.toFixed(2));

        if (y !== null) {
          newPairs.push(pairs[i + 1]); // Keep y unchanged
        }
      }

      return type + newPairs.join(",");
    })
    .join("");
}

function rotatePath(path: string): string {
  if (!path) return path;

  const commands = path.split(/(?=[MmLlHhVvCcSsQqTtAaZz])/);

  return commands
    .map((command) => {
      const type = command[0];
      const coords = command.slice(1).trim();

      if (!coords) return command;

      const pairs = coords.split(/[\s,]+/);
      const newPairs = [];

      for (let i = 0; i < pairs.length; i += 2) {
        if (pairs[i] === undefined) break;

        const x = parseFloat(pairs[i]);
        const y = pairs[i + 1] ? parseFloat(pairs[i + 1]) : null;

        if (isNaN(x)) continue;

        // Rotate coordinates 180 degrees around center
        const newX = 300 - x;
        newPairs.push(newX.toFixed(2));

        if (y !== null) {
          const newY = 200 - parseFloat(pairs[i + 1]);
          newPairs.push(newY.toFixed(2));
        }
      }

      return type + newPairs.join(",");
    })
    .join("");
}
//#endregion

interface RawFlagData {
  [countryCode: string]: {
    name: string;
    completeOutlinePath: string;
  };
}

interface ProcessedFlagData {
  [countryCode: string]: {
    name: string;
    completeOutlinePath: string;
    regions: Array<{
      id: string;
      path: string;
      color: null;
      correctColor: string;
    }>;
    outlineOptions: Array<{
      id: string;
      svg: string;
      isCorrect: boolean;
    }>;
  };
}

// Get current file's directory name (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function postProcessFlags() {
  try {
    const rawFlagsPath = join(__dirname, "../src/lib/flagDefinitions.tsx");
    const outputPath = join(
      __dirname,
      "../src/lib/processedFlagDefinitions.tsx"
    );
    const rawFileContent = await fs.readFile(rawFlagsPath, "utf8");

    // Extract flag data with support for backtick strings
    const flagRegex = /(\w+):\s*{([^}]+)}/g;
    const rawFlags: RawFlagData = {};

    let match;
    while ((match = flagRegex.exec(rawFileContent)) !== null) {
      const countryCode = match[1];
      const flagContent = match[2];

      const nameMatch = flagContent.match(/name:\s*["']([^"']+)["']/);
      // Updated to handle both quoted and backtick-wrapped content
      const pathMatch = flagContent.match(
        /completeOutlinePath:\s*(?:"|`)([^"`]+)(?:"|`)/
      );

      if (nameMatch && pathMatch) {
        rawFlags[countryCode] = {
          name: nameMatch[1],
          completeOutlinePath: pathMatch[1].trim(),
        };
      }
    }

    console.log("Processing flags:", Object.keys(rawFlags).join(", "));
    const processedFlags: ProcessedFlagData = {};

    for (const [countryCode, flagData] of Object.entries(rawFlags)) {
      try {
        const processedSVG = await processFlagSVG(flagData.completeOutlinePath);
        processedFlags[countryCode] = {
          name: flagData.name,
          completeOutlinePath: flagData.completeOutlinePath,
          regions: processedSVG.regions.map((region) => ({
            id: region.id,
            path: region.path,
            color: null,
            correctColor: region.correctColor,
          })),
          outlineOptions: processedSVG.outlineOptions.map((option, index) => ({
            id: option.id,
            svg: generateOptionSVG(option.svg, index === 0),
            isCorrect: option.isCorrect,
          })),
        };
      } catch (error) {
        console.error(`Error processing ${flagData.name}:`, error);
        processedFlags[countryCode] = flagData as any;
      }
    }

    const output = generateTypeScriptFile(processedFlags);
    await fs.writeFile(outputPath, output);
    console.log("Flag processing complete!");
  } catch (error) {
    console.error("Error in post-processing:", error);
    process.exit(1);
  }
}

function generateOptionSVG(pathData: string, isCorrect: boolean): string {
  return pathData; // Return just the path data, the full SVG will be constructed in generateTypeScriptFile
}

function generateRandomTransform(): string {
  const transforms = [
    "translate(50, 0)", // Slight shift right
    "translate(-50, 0)", // Slight shift left
    "scale(-1, 1)", // Horizontal flip
    "rotate(180, 150, 100)", // 180-degree rotation
  ];

  return transforms[Math.floor(Math.random() * transforms.length)];
}

function generateTypeScriptFile(flags: ProcessedFlagData): string {
  // First create a deep copy to avoid modifying the original data
  const processedFlags = JSON.parse(JSON.stringify(flags));

  // Process each flag's data
  for (const countryCode of Object.keys(processedFlags)) {
    const flag = processedFlags[countryCode];

    // Convert completeOutlinePath to a string if it's not already
    if (typeof flag.completeOutlinePath === "object") {
      flag.completeOutlinePath = JSON.stringify(flag.completeOutlinePath)
        .replace(/^"|"$/g, "") // Remove surrounding quotes
        .replace(/\\"/g, '"') // Unescape internal quotes
        .replace(/\\/g, ""); // Remove remaining escapes
    }

    // Fix SVG in outlineOptions
    flag.outlineOptions = flag.outlineOptions.map((option: any) => {
      // Create clean SVG string with proper spacing in path d attribute
      const svgString = `<svg viewBox="0 0 300 200" className="w-full h-full">
        <path
          d="${option.svg}"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"${
            option.isCorrect
              ? ""
              : `
          transform="${generateRandomTransform()}"`
          }
        />
      </svg>`;

      return {
        id: option.id,
        svg: svgString.replace(/\n\s*/g, "").replace(/pathd=/g, "path d="),
        isCorrect: option.isCorrect,
      };
    });
  }

  // Convert to string with proper indentation
  const stringified = JSON.stringify(processedFlags, null, 2)
    // Fix the SVG quotes and parentheses
    .replace(/"<svg/g, "(<svg")
    .replace(/<\/svg>"/g, "</svg>)")
    // Remove quotes around attribute values in SVG
    .replace(/\\"([^"]+)\\"/g, '"$1"')
    // Replace escaped quotes with single quotes where appropriate
    .replace(/\\"/g, "'")
    // Remove any remaining escapes
    .replace(/\\\\/g, "\\")
    // Fix React import reference
    .replace(/"React"/g, "React");

  return `// flagDefinitions.tsx
import { FlagDefinition } from "../types";
import React from 'react';

export const FLAGS: Record<string, FlagDefinition> = ${stringified};
`;
}

// Run the script
postProcessFlags();
