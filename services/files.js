import { readFileSync } from 'fs';

export async function doesFileExist(path) {
  const notreal = Bun.file(path);
  return await notreal.exists(); // false
  // return fs.existsSync(path);
}

export async function copyFile(input, output) {
  await Bun.write(Bun.file(output), Bun.file(input));
}

export function writeToFile(path, content) {
  const file = Bun.file(path);
  const writer = file.writer();
  writer.write(content);
  // writer.write("it was the worst of times\n");
}

export function getFileContents(path) {
    try {
        const text = readFileSync(path, 'utf-8'); // Read the file's contents as a string
        return text;
    } catch (error) {
        console.error(`Error reading file at ${path}:`, error);
        throw error; // Re-throw the error for the caller to handle
    }
}

export function inspectFile(filename) {
  const path = require("path");
  // const filename = 'hello.html';
  return {
    name: path.parse(filename).name, //=> "hello"
    extenstion: path.parse(filename).ext, //=> ".html"
    base: path.parse(filename).base, //=> "hello.html"
  };
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
