import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

const WIKIMEDIA_BASE_URL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

interface FlagMetadata {
  svgContent: string;
  viewBox: string;
  aspectRatio: string;
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

    console.log("Fetching data for " + url);
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
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/`/g, "\\`") // Escape backticks
    .replace(/\$/g, "\\$"); // Escape dollar signs

  function generateFallbackSVG(): string {
    // Generate a basic rectangle as fallback
    return `
    <svg xmlns="${SVG_NAMESPACE}" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="none" stroke="black" stroke-width="1"/>
    </svg>
  `.trim();
  }

  // Convert newlines to spaces to ensure single line output
  normalized = normalized.replace(/\n\s*/g, " ");

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

// Export the main function and helper functions for testing
export {
  downloadFlagSVG,
  processSVGContent,
  normalizeSVG,
  generateFallbackSVG,
};
