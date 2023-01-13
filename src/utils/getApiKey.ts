import * as vscode from "vscode";

export function getApiKey() {
  const config = vscode.workspace.getConfiguration("askVSUS");

  if (config.apiKey.length <= 0) {
    vscode.commands.executeCommand(
      "vsus.showErrorNotification",
      "Please, set up your api key"
    );
    return "";
  }

  return config.apiKey;
}
