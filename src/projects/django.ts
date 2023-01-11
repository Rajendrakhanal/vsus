import * as vscode from "vscode";

export namespace djangoProject {

export const createReactProject = async (destination: string) => {
    const projectName = await vscode.window.showInputBox({
      ignoreFocusOut: true,
      placeHolder: 'Name of your project. Example: hello-world',
      prompt: 'Enter name of your project',
      validateInput: (text: string) => {
        const correctProjectName = /^[A-Za-z-]+$/;
        if (text.match(correctProjectName)) {
          return null;
        }
        return 'Error project name.';
      },
    });

    if (projectName !== undefined) {
      const term = vscode.window.createTerminal();
      term.show();
      term.sendText(`cd ${destination}`);
      term.sendText(`django-admin startproject ${projectName} .`);
      setTimeout(() => vscode.window.showInformationMessage('Django project create successfully'), 3000);
    } else {
      vscode.window.showInformationMessage('ERROR: project name. Failed to create project');
    }
  };
}