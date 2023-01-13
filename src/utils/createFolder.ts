import * as path from "path";
import * as fse from "fs-extra";
import * as vscode from "vscode";

export function createFolder(location: string, folderName: string): void {
  try {
    fse.ensureDirSync(path.join(location, folderName));
  } catch (error) {
    console.log(error);

    vscode.commands.executeCommand(
      "vsus.showErrorNotification",
      "Some error occured while creating folder."
    );
  }
}
