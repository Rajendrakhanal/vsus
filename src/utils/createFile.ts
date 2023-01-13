import * as path from "path";
import * as fse from "fs-extra";
import * as vscode from "vscode";

export function createFile(
  location: string,
  fileName: string,
  content: string
): void {
  try {
    fse.writeFileSync(path.join(location, fileName), content);
  } catch (error) {
    console.log(error);

    vscode.commands.executeCommand(
      "vsus.showErrorNotification",
      "Some error occured while creating file."
    );
  }
}
