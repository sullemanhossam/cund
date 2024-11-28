import { existsSync, readFileSync, statSync, mkdirSync } from 'fs';
import { dirname, isAbsolute, parse, resolve} from "path";

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
  console.log("🚀 ~ getFileContents ~ path:", path);

  if (!doesFileExist(path)) {
    console.error(`Path does not exist: ${path}`);
    return 
  }

  try {
    const stats = statSync(path); // Get information about the path

    if (stats.isFile()) {
      // Read the file's contents as a string
      return readFileSync(path, 'utf-8');
    } else {
      console.error(`Path is not a file: ${path}`);
      return
    }
  } catch (error) {
    console.error(`Error accessing path ${path}:`, error);
    return // Return null if an error occurs
  }
}


export function inspectFile(path) {
  try {
    if (!path) {
      throw new Error('File path is required');
    }

    if (isAbsolute(path)) {
      path = resolve(path);
    }
 
    // Check if the file exists
    if (!existsSync(path)) {
      console.log(`File does not exist: ${path}`);
    }

    // Parse the path
    const parsed = parse(path);

    return {
      name: parsed.name,         // File name without extension
      extension: parsed.ext,     // File extension, including the dot
      base: parsed.base,         // Full file name with extension
      dir: parsed.dir,           // Directory path of the file
      isAbsolute: isAbsolute(path), // Check if the original path is absolute
    };
  } catch (error) {
    console.error(`Error inspecting file ${path}:`, error.message);
    // Re-throw if you want the caller to handle the error
    throw error;
  }
}
