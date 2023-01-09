import * as vscode from "vscode";

import boilerplatecode from "./json/boilerplatecode.json";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  /**
   * * Creating and Registering the command
   */
  const helloWorld = vscode.commands.registerCommand("vsus.helloWorld", () => {
    vscode.window.showInformationMessage(
      "Hello World from VS code User Snippets!"
    );

    console.log(boilerplatecode);
  });

  /**
   * TODO: Auto Completion of Boiler Plate Code
   * @Rajendra
   * @Ujjwal
   * @Saurav
   */

  /**
   * TODO: Notification Sample
   * @Susheel
   */
  const showInfoNotification = vscode.commands.registerCommand(
    "vsus.showInfoNotification",
    () => {
      vscode.window.showInformationMessage("Information from VSUS");
    }
  );
  const showWarningNotification = vscode.commands.registerCommand(
    "vsus.showWarningNotification",
    () => {
      vscode.window.showWarningMessage("Warning from VSUS");
    }
  );
  const showErrorNotification = vscode.commands.registerCommand(
    "vsus.showErrorNotification",
    () => {
      vscode.window.showErrorMessage("Error from VSUS");
    }
  );

  context.subscriptions.push(
    helloWorld,
    showErrorNotification,
    showInfoNotification,
    showWarningNotification
  );
}

export function deactivate() {}
