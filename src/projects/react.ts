import * as vscode from "vscode";
import { showInputBox } from "../utils/showInputBox";
export namespace reactProject {
  export const createReactProject = async (destination: string) => {
    const projectName = await showInputBox(
      "Name of your project. Example: hello-world",
      "Enter name of your project"
    );

    if (projectName !== undefined) {
      const term = vscode.window.createTerminal();
      term.show();
      term.sendText(`cd ${destination}`);
      term.sendText(`npx create-react-app ${projectName}`);
      setTimeout(
        () =>
          vscode.window.showInformationMessage(
            "React project create successfully"
          ),
        8000
      );
    } else {
      vscode.window.showInformationMessage(
        "ERROR: project name. Failed to create project"
      );
    }
  };
}
