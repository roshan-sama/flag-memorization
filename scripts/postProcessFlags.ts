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
      const { cx, cy, rs } = attributes;
      const r = Number(rs);
      return `M${cx},${cy} m-${r},0 a${r},${r} 0 1,0 ${
        r * 2
      },0 a${r},${r} 0 1,0 -${r * 2},0`;

    // Add other shape conversions as needed

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

function mirrorPath(path: string): string {
  // Implement path mirroring logic
  return path; // Placeholder
}

function rotatePath(path: string): string {
  // Implement path rotation logic
  return path; // Placeholder
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
    // Read the raw flag definitions
    const rawFlagsPath = join(__dirname, "../src/lib/flagDefinitions.tsx");
    const outputPath = join(
      __dirname,
      "../src/lib/processedFlagDefinitions.tsx"
    );

    // Extract the FLAGS object from the TypeScript file
    const rawFileContent = await fs.readFile(rawFlagsPath, "utf8");
    const flagsObjectMatch = rawFileContent.match(
      /export const FLAGS: Record<string, FlagDefinition> = ({[\s\S]*?});/
    );

    if (!flagsObjectMatch) {
      throw new Error("Could not find FLAGS object in file");
    }

    // Parse the FLAGS object
    const rawFlags: RawFlagData = eval(`(${flagsObjectMatch[1]})`);
    console.log(rawFlags, "raw flags");
    const processedFlags: ProcessedFlagData = {};

    // Process each flag
    for (const [countryCode, flagData] of Object.entries(rawFlags)) {
      console.log(`Processing flag for ${flagData.name}...`);

      try {
        // Process the SVG content
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
        // Keep the original data if processing fails
        processedFlags[countryCode] = flagData as any;
      }
    }

    // Generate the new TypeScript file
    const output = generateTypeScriptFile(processedFlags);
    await fs.writeFile(outputPath, output);

    console.log("Flag post-processing complete!");
  } catch (error) {
    console.error("Error in post-processing:", error);
    process.exit(1);
  }
}

function generateOptionSVG(pathData: string, isCorrect: boolean): string {
  return `
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <path
        d="${pathData}"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        ${isCorrect ? "" : `transform="${generateRandomTransform()}"`}
      />
    </svg>
  `;
}

function generateRandomTransform(): string {
  const transforms = [
    "scale(-1, 1) translate(-300, 0)", // Horizontal flip
    "scale(1, -1) translate(0, -200)", // Vertical flip
    "rotate(180 150 100)", // 180-degree rotation
    "translate(50, 0)", // Slight shift right
    "translate(-50, 0)", // Slight shift left
  ];

  return transforms[Math.floor(Math.random() * transforms.length)];
}

function generateTypeScriptFile(flags: ProcessedFlagData): string {
  return `// flagDefinitions.tsx
import { FlagDefinition } from "../types";
import React from 'react';

export const FLAGS: Record<string, FlagDefinition> = ${JSON.stringify(
    flags,
    null,
    2
  )
    .replace(/"svg": "([^"]+)"/g, (_, svg) => `"svg": (${svg})`)
    .replace(/"React"/g, "React")};
`;
}

// Run the script
postProcessFlags();
