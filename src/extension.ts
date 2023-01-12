import * as vscode from "vscode";
import { createProject } from "./projects";

import boilerplatecode from "./json/boilerplatecode.json";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  let helloWorld = vscode.commands.registerCommand("vsus.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from VSUS!");
    console.log(vscode.window.activeTextEditor?.document.fileName);
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("askVSUS.start", () => {
      const panel = vscode.window.createWebviewPanel(
        "AskVsus", // Identifies the type of the webview. Used internally
        "AskVsus", // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
      );
      // And set its HTML content
     panel.webview.html = getWebviewContent();
    })
  );


  const c = getLanguageCompletion("c");
  const cpp = getLanguageCompletion("cpp");
  const java = getLanguageCompletion("java");
  const go = getLanguageCompletion("go");
  const csharp = getLanguageCompletion("csharp");

  const showInfoNotification = vscode.commands.registerCommand(
    "vsus.showInfoNotification",
    () => {
      vscode.window.showInformationMessage("Information from VSUS");
    }
  );
  const showWarningNotification = vscode.commands.registerCommand(
    "vsus.showWarningNotification",
    () => {
      vscode.window.showWarningMessage("Warning from VSUS");
    }
  );
  const showErrorNotification = vscode.commands.registerCommand(
    "vsus.showErrorNotification",
    () => {
      vscode.window.showErrorMessage("Error from VSUS");
    }
  );

  const cProject = vscode.commands.registerCommand(
    "vsus.createCProject",
    () => {
      createProject("c");
    }
  );

  const cppProject = vscode.commands.registerCommand(
    "vsus.createCPPProject",
    () => {
      createProject("cpp");
    }
  );

  const reactProject = vscode.commands.registerCommand(
    "vsus.createReactProject",
    () => {
      createProject("react");
    }
  );

  const djangoProject = vscode.commands.registerCommand(
    "vsus.createdjangoProject",
    () => {
      createProject("django");
    }
  );

  const nodeProject = vscode.commands.registerCommand(
    "vsus.createNodeProject",
    () => {
      createProject("node");
    }
  );

  context.subscriptions.push(
    cppProject,
    nodeProject,
    cProject,
    reactProject,
    djangoProject,
    helloWorld,
    showErrorNotification,
    showInfoNotification,
    showWarningNotification
  );
}

const getLanguageCompletion = (
  language: "c" | "cpp" | "java" | "csharp" | "go"
): vscode.Disposable => {
  return vscode.languages.registerCompletionItemProvider(language, {
    provideCompletionItems() {
      const snippetCompletion = new vscode.CompletionItem(
        boilerplatecode[language].prefix
      );

      let body = boilerplatecode[language].body.join("");

      snippetCompletion.insertText = new vscode.SnippetString(body);

      return [snippetCompletion];
    },
  });
};

export function deactivate() {}


function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./media/askVSUS.css" />
    <title>AskVSUS</title>
</head>
<body>
<form>
<label for="fname" style="font-size: large">QUESTION :</label><br>
<br><textarea rows="8" type="text" id="qn" name="fname" style="width:55%; background:rgb(0, 0, 0); color: white; font-size: large"></textarea><br>
<label for="lname">Output:</label>
<br><input type="text" id="ans" name="lname">
</form>
</body>
</html>`;
}
