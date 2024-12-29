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

const WIKIMEDIA_BASE_URL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

interface FlagMetadata {
  svgContent: string;
  viewBox: string;
  aspectRatio: string;
}

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
    const outputDir = join(__dirname, "output");
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
    // { id: "FRA", name: "France" },
    // { id: "NPL", name: "Nepal" },
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

async function downloadFlagSVG(countryId: string): Promise<string> {
  try {
    // Map country codes to their full names for Wikimedia
    const countryNameMap: Record<string, string> = {
      JPN: "Japan.svg",
      FRA: "France.svg",
      NPL: "Nepal.svg",
      USA: "the_United_States.svg",
      GBR: "the_United_Kingdom.svg",
      // Add more mappings as needed
    };

    const flagName = countryNameMap[countryId];
    if (!flagName) {
      throw new Error(`No flag mapping found for country code: ${countryId}`);
    }

    // Construct the URL and fetch the SVG
    const url = `${WIKIMEDIA_BASE_URL}${flagName}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch flag SVG: ${response.statusText}`);
    }

    // Get the SVG content
    const svgContent = await response.text();

    // Parse the SVG to extract necessary information
    const metadata = await processSVGContent(svgContent);

    // Normalize the SVG to our standard format
    return normalizeSVG(metadata);
  } catch (error) {
    console.error(`Error downloading flag for ${countryId}:`, error);
    // Fallback to a basic rectangle if download fails
    return generateFallbackSVG();
  }
}

async function processSVGContent(svgContent: string): Promise<FlagMetadata> {
  try {
    // Parse the SVG XML
    const result = await parseStringPromise(svgContent);

    // Extract the SVG root element attributes
    const svgRoot = result.svg;
    const viewBox = svgRoot.$.viewBox || "0 0 300 200";
    const width = svgRoot.$.width || "300";
    const height = svgRoot.$.height || "200";

    return {
      svgContent,
      viewBox,
      aspectRatio: `${width}:${height}`,
    };
  } catch (error) {
    console.error("Error processing SVG content:", error);
    throw error;
  }
}

function normalizeSVG(metadata: FlagMetadata): string {
  // Remove XML declaration and doctype
  let normalized = metadata.svgContent
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<!DOCTYPE[^>]*>/, "")
    .trim();

  // Convert double quotes to single quotes within SVG
  normalized = normalized.replace(/="([^"]*)"/g, "='$1'");

  // Convert to standard format (300x200 viewBox)
  normalized = normalized
    .replace(/width='[^']*'/, "width='300'")
    .replace(/height='[^']*'/, "height='200'")
    .replace(/viewBox='[^']*'/, "viewBox='0 0 300 200'");

  // Escape backticks, dollar signs, and backslashes for template literal
  normalized = normalized
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  // Convert newlines to spaces to ensure single line output
  normalized = normalized.replace(/((\r*)\n(\s*))+/g, "");

  return normalized;
}

function generateFallbackSVG(): string {
  // Generate a basic rectangle as fallback
  return `
    <svg xmlns="${SVG_NAMESPACE}" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="none" stroke="black" stroke-width="1"/>
    </svg>
  `.trim();
}

// Execute the script
generateFlagDefinitions().catch(console.error);
