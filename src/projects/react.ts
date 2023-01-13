import * as vscode from "vscode";

import { Terminal } from "../components/terminal";
import { showInputBox } from "../utils/showInputBox";

export namespace reactProject {
  export const createReactProject = async (destination: string) => {
    const projectName = await showInputBox(
      "Name of your project. Example: hello-world",
      "Enter name of your project"
    );

    if (projectName !== undefined) {
      const reactTerminal = new Terminal();

      reactTerminal.toggleVisibility();
      reactTerminal.runCommand(`cd ${destination}`);
      reactTerminal.runCommand(`npx create-react-app ${projectName}`);

      vscode.commands.executeCommand(
        "vsus.showInfoNotification",
        "Your reactjs project will be created shortly"
      );
    } else {
      vscode.commands.executeCommand(
        "vsus.showErrorNotification",
        "Failed to create reactjs project"
      );
    }
  };
}
