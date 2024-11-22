const fs = require("fs");
import { File } from "./class/file";
import { Mirror } from "./class/mirror";

(async () => {
  // Example usage
  const filePath = "./demo.js"; // Replace with the path to your JavaScript file
  const myFile = new File(filePath);
  const myFileMirrored = new Mirror(myFile);
  myFileMirrored.writeToDisk()
  // console.log(myFile);

  // const fileMetadata = inspectFile(filePath)

  // console.log(fileMetadata)

  // await copyFile(filePath, `./out/${fileMetadata.name}.md`);
  // a new file is made with the contents of the base file

  // we would like to make a markdown file from the code
})();

// try {
//     const outline = generateOutline(filePath);
//     console.log('File Outline:', JSON.stringify(outline, null, 2));
// } catch (error) {
//     console.error('Error reading or parsing file:', error.message);
// }

// (async() => {
//     // read all the files in the current directory, recursively
//     const files = await readdir("../", { recursive: true });
// })()
