"use strict";

import * as vscode from "vscode";
import { openDialogBox } from "./utils/openDialogBox";

import { reactProject } from "./projects/react";
import { cppProject } from "./projects/cpp";
import { nodeProject } from "./projects/node";
import { djangoProject } from "./projects/django";
import { cProject } from "./projects/c";

export async function createProject(fileType: string) {
  const folderName = await openDialogBox();

  if (folderName && folderName.fsPath) {
    switch (fileType) {
      case "c":
        await vscode.commands.executeCommand("vscode.openFolder", folderName);
        await cProject.create(folderName.fsPath);
        break;


      case "cpp":
        await vscode.commands.executeCommand("vscode.openFolder", folderName);
        await cppProject.create(folderName.fsPath);
        break;

      case "react":
        await reactProject.createReactProject(folderName.fsPath);
        break;

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
