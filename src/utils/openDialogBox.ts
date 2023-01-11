import * as vscode from "vscode";

export async function openDialogBox(): Promise<vscode.Uri | undefined> {
  const options: vscode.OpenDialogOptions = {
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
  };

  const selectedFolder: vscode.Uri[] | undefined =
    await vscode.window.showOpenDialog(options);
  if (selectedFolder) {
    return Promise.resolve(selectedFolder[0]);
  }

  return Promise.resolve(selectedFolder ? selectedFolder[0] : undefined);
}
