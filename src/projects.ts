"use strict";

import * as vscode from "vscode";
import { openDialogBox } from "./utils/openDialogBox";

import { cppProject } from "./projects/cpp";
import { nodeProject } from "./projects/node";
import { djangoProject } from "./projects/django";


export async function createProject(fileType: string) {
  const folderName = await openDialogBox();

  console.log(folderName);
  if (folderName && folderName.fsPath) {
    switch (fileType) {
      case "django":   
        await vscode.commands.executeCommand("vscode.openFolder", folderName);
        await djangoProject.createReactProject(folderName.fsPath);
        break;
      case "node":
        await vscode.commands.executeCommand("vscode.openFolder", folderName);
        await nodeProject.create(folderName.fsPath);
        break;

      default:
        console.log(`ERROR: ${fileType} invalid type project to create.`);
    }
  }
}
