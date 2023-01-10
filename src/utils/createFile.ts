import * as path from "path";
import * as fse from "fs-extra";

export function createFile(
  location: string,
  fileName: string,
  content: string
): void {
  try {
    fse.writeFileSync(path.join(location, fileName), content);
  } catch (error) {
    console.log(error);
  }
}
