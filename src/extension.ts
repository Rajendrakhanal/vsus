import * as vscode from "vscode";
import { createProject } from "./projects";

import boilerplatecode from "./json/boilerplatecode.json";
import { askVSUS } from "./utils/askVSUS";
import { showInputBox } from "./utils/showInputBox";
import { AskVSUSWebPanel } from "./components/askVSUSWebPanel";

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

        const aVSUSPanel = new AskVSUSWebPanel();

        aVSUSPanel.setWebViewPanelHTMLContent([question, response]);
        aVSUSPanel.showWebView();
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
