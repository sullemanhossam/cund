import { existsSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { mkdirSync } from "fs";
import { dirname } from "path";

export async function doesFileExist(path) {
  return existsSync(path);
}

export async function copyFile(input, output) {
  await Bun.write(Bun.file(output), Bun.file(input));
}

export function writeToFile(path, content) {
  console.log("🚀 ~ writeToFile ~ content:", content)
  console.log("🚀 ~ writeToFile ~ path:", path)
 // Ensure the directory exists
 const dir = dirname(path);
 try {
   mkdirSync(dir, { recursive: true }); // Create directories if they don't exist
 } catch (error) {
   console.error("🚀 ~ writeToFile ~ mkdirSync error:", error);
   throw new Error(`Failed to create directory: ${dir}`);
 }

 // Write to file
 const file = Bun.file(path);
 const writer = file.writer();
  writer.write(content);
  
}

export function getFileContents(path) {
  const stats = statSync(path); // Get information about the path
    if (stats.isFile()) {
      try {
        const text = readFileSync(path, 'utf-8'); // Read the file's contents as a string
        return text;
    } catch (error) {
        console.error(`Error reading file at ${path}:`, error);
        // throw error; // Re-throw the error for the caller to handle
    }
    }
}


export function inspectFile(filePath) {
  try {
    if (!filePath) {
      throw new Error('File path is required');
    }

    // Normalize the path to ensure consistency
    const normalizedPath = path.resolve(filePath);

    // Check if the file exists
    if (!existsSync(normalizedPath)) {
      throw new Error(`File does not exist: ${normalizedPath}`);
    }

    // Parse the path
    const parsed = path.parse(normalizedPath);

    return {
      name: parsed.name,         // File name without extension
      extension: parsed.ext,     // File extension, including the dot
      base: parsed.base,         // Full file name with extension
      dir: parsed.dir,           // Directory path of the file
      isAbsolute: path.isAbsolute(filePath), // Check if the original path is absolute
    };
  } catch (error) {
    console.error(`Error inspecting file ${filePath}:`, error.message);
    // Re-throw if you want the caller to handle the error
    throw error;
  }
}

export function deduceFileLanguage(extenstion) {
  switch (extenstion) {
    case "js":
      return { framework: "none", lang: "javascript" };
      case "tsx":
      return { framework: "react", lang: "typescript" };
    case "jsx":
      return { framework: "react", lang: "javascript" };
    default:
      break;
  }
}
