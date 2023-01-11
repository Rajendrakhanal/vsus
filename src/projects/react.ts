import * as vscode from "vscode";
export namespace reactProject {
  export const createReactProject = async (destination: string) => {
    const projectName = await vscode.window.showInputBox({
      ignoreFocusOut: true,
      placeHolder: "Name of your project. Example: hello-world",
      prompt: "Enter name of your project",
      validateInput: (text: string) => {
        const correctProjectName = /^[A-Za-z-]+$/;
        if (text.match(correctProjectName)) {
          return null;
        }
        return "Error project name.";
      },
    });

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
