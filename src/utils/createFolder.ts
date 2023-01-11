import * as path from "path";
import * as fse from "fs-extra";

export function createFolder(location: string, folderName: string): void {
  try {
    fse.ensureDirSync(path.join(location, folderName));
  } catch (error) {
    console.log(error);
  }
}
