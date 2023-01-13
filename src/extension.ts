import * as vscode from "vscode";
import { createProject } from "./projects";

import boilerplatecode from "./json/boilerplatecode.json";
import { askVSUS } from "./utils/askVSUS";
import { showInputBox } from "./utils/showInputBox";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  let helloWorld = vscode.commands.registerCommand("vsus.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from VSUS!");
    console.log(vscode.window.activeTextEditor?.document.fileName);
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("askVSUS.start", async () => {
      const question = await showInputBox("Enter your question...", "Question");

      if (question !== undefined) {
        const response = await askVSUS(question);
        const panel = vscode.window.createWebviewPanel(
          "AskVsus", // Identifies the type of the webview. Used internally
          "AskVsus", // Title of the panel displayed to the user
          vscode.ViewColumn.One, // Editor column to show the new webview panel in.
          {} // Webview options. More on these later.
        );
        // And set its HTML content
        panel.webview.html = getWebviewContent(question, response);
      }
    })
  );

  registerLanguageCompletion();
  registerProjectBoilerPlateCode(context);
  registerNotification(context);

  context.subscriptions.push(helloWorld);
}

function registerLanguageCompletion() {
  getLanguageCompletion("c");
  getLanguageCompletion("cpp");
  getLanguageCompletion("java");
  getLanguageCompletion("go");
  getLanguageCompletion("csharp");
}

function registerProjectBoilerPlateCode(context: vscode.ExtensionContext) {
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
    djangoProject
  );
}

function registerNotification(context: vscode.ExtensionContext) {
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

  context.subscriptions.push(
    showErrorNotification,
    showInfoNotification,
    showWarningNotification
  );
}

export function deactivate() {}

function getWebviewContent(question: string, response: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AVUS</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
  
      body {
        background-color: black;
        margin: 20px;
        height: 100vh;
        font-family: sans-serif;
      }
  
      #question {
        width: 100%;
        height: fit-content;
        padding-bottom: 1rem ;
        border-bottom: rgb(17, 0, 253) 4px solid;
        font-size: 1.5rem;
        text-align: center;
        color: aliceblue;
        overflow-wrap: break-word;
      }
  
      #response {
        color: aliceblue;
        margin-top: 20px;
        letter-spacing: 1px;
        font-size: 1.25rem;
        overflow-wrap: break-word;
      }
    </style>
  </head>
  
  <body>
    <div id="question" type="text">
      ${question}
    </div>
    <div id="response">
      ${response}
    </div>
  
  </body>
  
  </html>
`;
}

function getLanguageCompletion(
  language: "c" | "cpp" | "java" | "csharp" | "go"
): vscode.Disposable {
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
}
