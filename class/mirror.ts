import { codeBlock } from "../services/blocks";
import { writeToFile } from "../services/files";
import { generateOutline } from "../services/outlines";

export class Mirror {
  file: any; // Size of the file in bytes
  codeBlock: string;
  outline: any;

  constructor(file: any) {
    this.file = file;
    this.codeBlock = codeBlock(file["contents"], file["language"]);
    this.outline =  generateOutline(file["contents"])
  }

  writeToDisk(path = `./${this.file.metaData["name"]}.md`) {
    writeToFile(path, this.codeBlock);
    // writeToFile(path, this.outline);
  }
}
