import { getFileContents, inspectFile } from "../services/files";
var detect = require("language-detect");

// type Language = {
//   framework: string | null;
//   lang: string | null;
// };

type MetaData = {
  name: string;
  extension: string;
  base: string;
  language: string | undefined
};

export class File {
    path : string
//   mirror: string | undefined; // mirrored version of the file
//   language: Language | undefined; // Programming or spoken language of the file's content
  metaData: MetaData | undefined; // File metadata
  contents: string | undefined; // Assuming file contents are text-based

    constructor(path: string) {
        this.path = path
            this.contents = getFileContents(path);
            this.metaData = inspectFile(path);
            // this.language = {
        //       framework: null,
            //   lang: this.contents ? detect(this.contents) : null, // Using detect function correctly
            // };
        //   }
    }
}