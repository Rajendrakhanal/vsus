import * as vscode from "vscode";
import { createProject } from "./projects";


import boilerplatecode from "./json/boilerplatecode.json";


export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  let helloWorld = vscode.commands.registerCommand("vsus.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from VSUS!");
  });

  const C = vscode.languages.registerCompletionItemProvider("c", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      const snippetCompletion = new vscode.CompletionItem(
        boilerplatecode.C.prefix
      );
      let body = boilerplatecode.C.body.join("");
      snippetCompletion.insertText = new vscode.SnippetString(body);
      // return all completion items as array
      return [snippetCompletion];
    },
  });

  const cpp = vscode.languages.registerCompletionItemProvider("cpp", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      const snippetCompletion = new vscode.CompletionItem(
        boilerplatecode["C++"].prefix
      );
      let body = boilerplatecode["C++"].body.join("");
      snippetCompletion.insertText = new vscode.SnippetString(body);
      // return all completion items as array
      return [snippetCompletion];
    },
  });

  const Java = vscode.languages.registerCompletionItemProvider("java", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      const snippetCompletion = new vscode.CompletionItem(
        boilerplatecode.Java.prefix
      );
      let body = boilerplatecode.Java.body.join("");
      snippetCompletion.insertText = new vscode.SnippetString(body);
      // return all completion items as array
      return [snippetCompletion];
    },
  });

  const Go = vscode.languages.registerCompletionItemProvider("go", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      const snippetCompletion = new vscode.CompletionItem(
        boilerplatecode.Go.prefix
      );
      let body = boilerplatecode.Go.body.join("");
      snippetCompletion.insertText = new vscode.SnippetString(body);
      // return all completion items as array
      return [snippetCompletion];
    },
  });

  const Csharp = vscode.languages.registerCompletionItemProvider("csharp", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      const snippetCompletion = new vscode.CompletionItem(
        boilerplatecode.Csharp.prefix
      );
      let body = boilerplatecode.Csharp.body.join("");
      snippetCompletion.insertText = new vscode.SnippetString(body);
      // return all completion items as array
      return [snippetCompletion];
    },

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

export function deactivate() {}
