// scripts/generateFlagDefinitions.ts
import fetch from "node-fetch";
import fs from "fs/promises";
import path from "path";
import { parseStringPromise } from "xml2js";
import { JSDOM } from "jsdom";

// File header template
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
    const outputDir = path.join(__dirname, "..", "src");
    await fs.mkdir(outputDir, { recursive: true });

    // Initialize output file with header
    const outputPath = path.join(outputDir, "flagDefinitions.tsx");
    await fs.writeFile(outputPath, FILE_HEADER);

    // Get initial country list from UN Members API
    const countries = await getUNMemberStates();

    // Process each country
    for (const country of countries) {
      const flagData = await processFlagData(country);
      if (flagData) {
        const flagDefinition = generateFlagDefinition(flagData);
        await appendToFile(outputPath, flagDefinition);
      }
    }

    // Add file footer
    await fs.appendFile(outputPath, FILE_FOOTER);

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
            ${generateOutlineSvg(flagData)}
          </svg>
        ),
        isCorrect: true
      },
      ${generateIncorrectOptions(flagData)}
    ],
    regions: [
      ${generateRegions(flagData)}
    ]
  },`;
}

function generateOutlineSvg(flagData: ProcessedFlag): string {
  // Generate the correct outline SVG
  // This is a simplified version - would need enhancement for complex flags
  return flagData.regions
    .map(
      (region) => `
      <path
        d="${region.path}"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />`
    )
    .join("");
}

function generateIncorrectOptions(flagData: ProcessedFlag): string {
  // Generate 2-3 incorrect variations of the flag outline
  return flagData.outlineOptions
    .filter((option) => !option.isCorrect)
    .map(
      (option) => `
      {
        id: "${option.id}",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            ${option.svg}
          </svg>
        ),
        isCorrect: false
      }`
    )
    .join(",");
}

function generateRegions(flagData: ProcessedFlag): string {
  return flagData.regions
    .map(
      (region) => `
      {
        id: "${region.id}",
        path: "${region.path}",
        color: null,
        correctColor: "${region.correctColor}"
      }`
    )
    .join(",");
}

async function appendToFile(filePath: string, content: string) {
  await fs.appendFile(filePath, content);
}

async function downloadFlagSVG(countryId: string): Promise<string> {
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

// Execute the script
generateFlagDefinitions();
