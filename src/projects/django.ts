import * as vscode from "vscode";
import { showInputBox } from "../utils/showInputBox";

export namespace djangoProject {
  export const createReactProject = async (destination: string) => {
    const projectName = await showInputBox(
      "Name of your project. Example: hello-world",
      "Enter name of your project"
    );

    if (projectName !== undefined) {
      const term = vscode.window.createTerminal();
      term.show();
      term.sendText(`cd ${destination}`);
      term.sendText(`django-admin startproject ${projectName} .`);
      setTimeout(
        () =>
          vscode.window.showInformationMessage(
            "Django project create successfully"
          ),
        3000
      );
    } else {
      vscode.window.showInformationMessage(
        "ERROR: project name. Failed to create project"
      );
    }
  };
}
