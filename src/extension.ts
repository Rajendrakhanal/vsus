import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  /**
   * Creating and Registering the command
   */
  const helloWorld = vscode.commands.registerCommand("vsus.helloWorld", () => {
    vscode.window.showInformationMessage(
      "Hello World from VS code User Snippets!"
    );
  });

  /**
   * TODO: Auto Completion of Boiler Plate Code
   */

  /**
   * TODO: Notification Sample
   */

  context.subscriptions.push(helloWorld);
}

export function deactivate() {}
