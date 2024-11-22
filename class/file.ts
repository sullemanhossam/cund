import {
  getFileContents,
  inspectFile,
} from "../services/files";
var detect = require("language-detect");

type language = {
  framework: any;
  lang: any;
};

type metaData = {
  name: string;
  extenstion: string;
  base: string;
};

export class File {
  mirror: string | undefined; // mirrored version of the file
  language: language | undefined; // Programming or spoken language of the file's content
  metaData: metaData | undefined; // File extension (e.g., .txt, .js, .png)
  contents: any;

  constructor(path: string) {
    this.contents = getFileContents(path);
    this.metaData = inspectFile(path);
    this.language = detect.contents(path, this.contents); //=> "JavaScript"
  }
}
