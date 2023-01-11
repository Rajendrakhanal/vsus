"use strict";

import * as vscode from "vscode";
import { openDialogBox } from "./utils/openDialogBox";
import { djangoProject } from "./projects/django";

export async function createProject(fileType: string) {
  const folderName = await openDialogBox();

  if (folderName && folderName.fsPath) {
    switch (fileType) {
      case "django":   
        await vscode.commands.executeCommand("vscode.openFolder", folderName);
        await djangoProject.createReactProject(folderName.fsPath);
        break;

      default:
        console.log(`ERROR: ${fileType} invalid type project to create.`);
    }
  }
}
