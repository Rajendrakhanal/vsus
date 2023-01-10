import * as path from "path";
import * as fse from "fs-extra";

export function createFile(location: string, fileName: string): void {
  try {
    fse.ensureFileSync(path.join(location, fileName));
  } catch (error) {
    console.log(error);
  }
}
