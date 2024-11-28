import { getFileContents, inspectFile } from "../services/files";

type MetaData = {
  name: string;
  extension: string;
    base: string;
    dir: string;
    isAbsolute: boolean
};

export class File {
    path : string
  metaData: MetaData | undefined; // File metadata
  contents: string | undefined; // Assuming file contents are text-based

    constructor(path: string) {
        this.path = path
            this.contents = getFileContents(path);
            this.metaData = inspectFile(path);
    }
}