import * as vscode from "vscode";

export async function showInputBox(placeholder: string, prompt: string) {
  const question = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: placeholder,
    prompt: prompt,
  });

  return question;
}
