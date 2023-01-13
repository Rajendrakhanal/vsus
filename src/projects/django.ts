import * as vscode from "vscode";

import { Terminal } from "../components/terminal";
import { showInputBox } from "../utils/showInputBox";

export namespace djangoProject {
  export const createReactProject = async (destination: string) => {
    const projectName = await showInputBox(
      "Name of your project. Example: hello-world",
      "Enter name of your project"
    );

    if (projectName !== undefined && projectName.length > 0) {
      const djangoTerminal = new Terminal();

      djangoTerminal.toggleVisibility();
      djangoTerminal.runCommand(`cd ${destination}`);
      djangoTerminal.runCommand(`django-admin startproject ${projectName} .`);
      
      vscode.commands.executeCommand(
        "vsus.showInfoNotification",
        "Your django project will be created shortly"
      );
    } else {
      vscode.commands.executeCommand(
        "vsus.showErrorNotification",
        "Failed to create django project"
      );
    }
  };
}
