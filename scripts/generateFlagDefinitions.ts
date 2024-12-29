// scripts/generateFlagDefinitions.ts
import fetch from "node-fetch";
import { writeFile, mkdir, appendFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseStringPromise } from "xml2js";
import { JSDOM } from "jsdom";

// Get current file's directory name (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_HEADER = `// flagDefinitions.tsx
import { FlagDefinition } from "../types";
import React from 'react';

export const FLAGS: Record<string, FlagDefinition> = {
`;

const FILE_FOOTER = `
};
`;

interface ProcessedFlag {
  name: string;
  id: string;
  aspectRatio: string;
  svgData: string;
  regions: any[];
  outlineOptions: any[];
}

async function generateFlagDefinitions() {
  try {
    // Create output directory if it doesn't exist
    const outputDir = join(__dirname, "..", "src");
    await mkdir(outputDir, { recursive: true });

    // Initialize output file with header
    const outputPath = join(outputDir, "flagDefinitions.tsx");
    await writeFile(outputPath, FILE_HEADER);

    // Get initial country list
    const countries = await getUNMemberStates();
    console.log("Processing countries:", countries);

    // Process each country
    for (const country of countries) {
      console.log(`Processing country: ${country.name}`);
      const flagData = await processFlagData(country);
      if (flagData) {
        const flagDefinition = generateFlagDefinition(flagData);
        await appendFile(outputPath, flagDefinition);
        console.log(`Successfully processed ${country.name}`);
      }
    }

    // Add file footer
    await appendFile(outputPath, FILE_FOOTER);

    console.log("Flag definitions generated successfully!");
  } catch (error) {
    console.error("Error generating flag definitions:", error);
  }
}

async function getUNMemberStates() {
  // For initial testing, return a small subset of countries
  return [
    { id: "JPN", name: "Japan" },
    { id: "FRA", name: "France" },
    { id: "NPL", name: "Nepal" },
  ];
}

async function processFlagData(country: {
  id: string;
  name: string;
}): Promise<ProcessedFlag | null> {
  try {
    // Download and process SVG data
    const svgData = await downloadFlagSVG(country.id);
    const { aspectRatio, regions, outlineOptions } = await processFlag(svgData);

    return {
      name: country.name,
      id: country.id,
      aspectRatio,
      svgData,
      regions,
      outlineOptions,
    };
  } catch (error) {
    console.error(`Error processing flag for ${country.name}:`, error);
    return null;
  }
}

async function downloadFlagSVG(countryId: string): Promise<string> {
  console.log(`Downloading flag for ${countryId}`);
  // This would be replaced with actual flag SVG downloading logic
  // For now, return a placeholder
  if (countryId === "JPN") {
    return "M0,0 h300 v200 h-300 Z";
  }
  throw new Error("Flag download not implemented");
}

async function processFlag(svgData: string): Promise<any> {
  // This would process the SVG to extract regions and generate options
  // For now, return placeholder data
  return {
    aspectRatio: "3:2",
    regions: [
      {
        id: "background",
        path: "M0,0 h300 v200 h-300 Z",
        correctColor: "#FFFFFF",
      },
    ],
    outlineOptions: [],
  };
}

function generateFlagDefinition(flagData: ProcessedFlag): string {
  // Convert the processed flag data into a TSX-compatible string
  return `
  ${flagData.id}: {
    name: "${flagData.name}",
    completeOutlinePath: "${flagData.svgData}",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="${flagData.svgData}"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true
      }
    ],
    regions: [
      {
        id: "background",
        path: "M0,0 h300 v200 h-300 Z",
        color: null,
        correctColor: "#FFFFFF"
      }
    ]
  },`;
}

// Execute the script
generateFlagDefinitions().catch(console.error);
