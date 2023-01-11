import * as vscode from "vscode";
import { createProject } from "./projects";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');
  
  let disposable = vscode.commands.registerCommand("vsus.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from VSUS!");
  });

  context.subscriptions.push(disposable);

  const djangoProject = vscode.commands.registerCommand(
    "vsus.createdjangoProject",
    () => {
      createProject("django");
    }
  );

  context.subscriptions.push(djangoProject);
}

export function deactivate() {}
