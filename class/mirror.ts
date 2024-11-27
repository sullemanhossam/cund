import { codeBlock } from "../services/blocks";
import { writeToFile } from "../services/files";
import { generateOutline } from "../services/outlines";
import type { File } from "./file";

export class Mirror {
  destination: any;
  file: any;
  // file: any; // Instance of the File class
  // codeBlock: string | undefined; // Code block representation of file content
  // outline: string | undefined; // Outline of file content

  constructor(destination: any, file: any) {
    //  have this execute whenever a mirror is made
    this.file = file;
    this.destination = (destination + "/" + this.file.path).replace(/\.[^/.]+$/, ".md");
  }

  initMirror() {
    // console.log("🚀 ~ Mirror ~ initMirror ~ file:", this.file)
    // console.log("🚀 ~ Mirror ~ initMirror ~ destination:", this.destination)
    let contentToWrite = "";
    if (!this.file.contents) {
      console.log("Empty File Skipping...")
      return
    }
    contentToWrite += `# Code Block\n\n${codeBlock(this.file)}\n`;
    writeToFile(this.destination, contentToWrite);

  }

}
