import { codeBlock } from "../services/blocks";
import { writeToFile } from "../services/files";
import { generateOutline } from "../services/outlines";

export class Mirror {
  // file: any; // Instance of the File class
  // codeBlock: string | undefined; // Code block representation of file content
  // outline: string | undefined; // Outline of file content

  constructor(path: any, file: any) {
    this.path = path;
    this.file = file;

    // // Check if language is detected and contents are available
    // if (file.language && file.contents) {
    //   this.codeBlock = codeBlock(file.contents, file.language.lang);
    //   this.outline = generateOutline(file.contents);
    // } else {
    //   this.codeBlock = undefined;
    //   this.outline = undefined;
    // }
  }

  writeToDisk() {
    // switch (file) {
    //   case file.content:
    // 
    //     // Write the codeBlock and outline to the file, separated by a header
    //     let contentToWrite = "";

    //     if (file.content) {
    //       contentToWrite += `# Code Block\n\n${file.content}\n`;
    //     }
    //     writeToFile(fullPath, contentToWrite);

    //     // if (this.outline) {
    //     //   contentToWrite += `\n# Outline\n\n${this.outline}\n`;
    //     // }

    //     break;
    
    //   default:
    //     break;
    // } 
    // const fileName = this.file?.metaData?.name ?? "unknown_file";
    // const fullPath = `${this.path}/${fileName}.md`;

    // console.log("🚀 ~ Mirror ~ writeToDisk ~ writeToDisk:", this.file);
    // writeToFile(this.file.content)
// const destinationPath = this.file.path.replace(file.name , file.base)
    // Construct the full file path
  }
}
