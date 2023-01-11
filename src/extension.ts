import * as vscode from "vscode";
import { createProject } from "./projects";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  let disposable = vscode.commands.registerCommand("vsus.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from VSUS!");
  });

  context.subscriptions.push(disposable);

  const cProject = vscode.commands.registerCommand(
    "vsus.createCProject",
    () => {
      createProject("c");
    }
  );
  const cppProject = vscode.commands.registerCommand(
    "vsus.createCPPProject",
    () => {
      createProject("cpp");
    }
  );
  const reactProject = vscode.commands.registerCommand(
    "vsus.createReactProject",
    () => {
      createProject("react");
    }
  );

  context.subscriptions.push(cppProject,reactProject);
}

export function deactivate() {}
