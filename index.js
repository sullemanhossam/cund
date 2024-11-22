const fs = require("fs");
import { File } from "./class/file";
import { Mirror } from "./class/mirror";
import { readdir } from "node:fs/promises";
const defaultIgnore = []
const readPath = './'
const writePath = './'
const { readFile } = require('fs/promises');
const ignore = require('ignore');
// (async () => {
//   // Example usage
//   const filePath = "./demo.js"; // Replace with the path to your JavaScript file
//   const myFile = new File(filePath);
//   const myFileMirrored = new Mirror(myFile);
//   myFileMirrored.writeToDisk()
//   // console.log(myFile);

//   // const fileMetadata = inspectFile(filePath)

//   // console.log(fileMetadata)

//   // await copyFile(filePath, `./out/${fileMetadata.name}.md`);
//   // a new file is made with the contents of the base file

//   // we would like to make a markdown file from the code
// })();

// try {
//     const outline = generateOutline(filePath);
//     console.log('File Outline:', JSON.stringify(outline, null, 2));
// } catch (error) {
//     console.error('Error reading or parsing file:', error.message);
// }

async function filterFiles() {
      // Create an ignore manager with optional settings
      const ig = ignore({
        ignorecase: true, // Case-insensitive matching
    });

    // Read and parse .gitignore
    ig.add(await readFile('.gitignore', 'utf8').catch(() => ''));
    // Add patterns to the ignore manager
    ig.add([
        ...defaultIgnore,
        '.obsidian',
        '.git',
        '*.md'
        // '!important.log', // Exclude "important.log" from being ignored
    ]);

    // Get all files and filter using .gitignore
    const files = await readdir(readPath, { recursive: true });
    const filteredFiles = files.filter(file => !ig.ignores(file));

    // Log files not ignored
    console.log(filteredFiles);
    return filteredFiles
}

function mirrorFiles(files) {
    files.forEach(element => {
        //   // Example usage
    // const filePath = "./demo.js"; // Replace with the path to your JavaScript file
    const myFile = new File(element);
    const myFileMirrored = new Mirror(myFile);
     myFileMirrored.writeToDisk(element)
    });
}

(async () => {
    try {
    await mirrorFiles(await filterFiles)
    } catch (err) {
        console.error('Error:', err);
    }
})();
