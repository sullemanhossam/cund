import { File } from "./class/file";
import { Mirror } from "./class/mirror";
import { readdir } from "node:fs/promises";
const { readFile } = require("fs/promises");
const ignore = require("ignore");

const defaultIgnore = [];
const readPath = "./";
const writePath = "/Users/hossam/Git/cund-obsidian";

(async () => {
  try {
    // First we will read the directory for the files
    const files = await readdir(readPath, { recursive: true });
    console.log("🚀 ~ files:", files)
    // Now we will filter the files to remove the ones that are included within the gitignore ect
    const filteredFiles = await filterFiles(files);
    console.log("🚀 ~ filteredFiles:", filteredFiles)
    // We will create a virtual file from the files found at source
    const virtualFiles = await createVirtualFiles(filteredFiles)
    console.log("🚀 ~ virtualFiles:", virtualFiles)
    // Next we will mirror the virtual files into the output directory 
    
    await mirrorFiles(virtualFiles, writePath).forEach((mirror) => {
      try {
      mirror.initMirror()
      } catch (error) {
          console.log("🚀 ~ files.forEach : Mirror ~ error:", error)
      }
    });
    
  } catch (err) {
    console.log("🚀 ~ err:", err)
  }
})();

function createVirtualFiles(files) {
  let virtualFiles = []
  files.forEach((file) => {
    // console.log("🚀 ~ files.forEach ~ file:", file)
    try {
      const myFile = new File(file);
      virtualFiles = [...virtualFiles, myFile]
    } catch (error) {
        // console.log("🚀 ~ files.forEach ~ error:", error)
    }
  });
  return virtualFiles
  // we wll return an array of virtual files 
}

function mirrorFiles(files) {
  let mirroredFiles = []
    files.forEach((file) => {
        // console.log("🚀 ~ files.forEach ~ file:", file)
        try {
            const myMirror = new Mirror(writePath, file)
            mirroredFiles = [...mirroredFiles, myMirror]
        } catch (error) {
        }
    });
    return mirroredFiles

}

async function filterFiles(files) {
  // Create an ignore manager with optional settings
  const ig = ignore({
    ignorecase: true, // Case-insensitive matching
  });

  // Read and parse .gitignore
  ig.add(await readFile(".gitignore", "utf8").catch(() => ""));
  // Add patterns to the ignore manager
  ig.add([
    ...defaultIgnore,
    ".obsidian",
    ".git",
    "*.md",
    // '!important.log', // Exclude "important.log" from being ignored
  ]);

  // Get all files and filter using .gitignore
  // const files = await readdir(readPath, { recursive: true });
  const filteredFiles = files.filter((file) => !ig.ignores(file));
  // console.log("🚀 ~ filterFiles ~ filteredFiles:", filteredFiles)

  // Log files not ignored
  return filteredFiles;
}