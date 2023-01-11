"use strict";

import * as vscode from "vscode";
import { openDialogBox } from "./utils/openDialogBox";
import { cProject } from "./projects/c";

export async function createProject(fileType: string) {
  const folderName = await openDialogBox();

  if (folderName && folderName.fsPath) {
    switch (fileType) {
      case "c":   
        await vscode.commands.executeCommand("vscode.openFolder", folderName);
        await cProject.create(folderName.fsPath);
        break;

      default:
        console.log(`ERROR: ${fileType} invalid type project to create.`);
    }
  }
}
