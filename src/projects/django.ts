import * as vscode from "vscode";

import { Terminal } from "../components/terminal";
import { showInputBox } from "../utils/showInputBox";

export namespace djangoProject {
  export const createReactProject = async (destination: string) => {
    const projectName = await showInputBox(
      "Name of your project. Example: hello-world",
      "Enter name of your project"
    );

    if (projectName !== undefined) {
      const djangoTerminal = new Terminal();

      djangoTerminal.toggleVisibility();
      djangoTerminal.runCommand(`cd ${destination}`);
      djangoTerminal.runCommand(`django-admin startproject ${projectName} .`);

      setTimeout(
        () =>
          vscode.window.showInformationMessage(
            "Django project create successfully"
          ),
        3000
      );
    } else {
      vscode.commands.executeCommand(
        "vsus.showErrorNotification",
        "ERROR: project name. Failed to create project"
      );
    }
  };
}
