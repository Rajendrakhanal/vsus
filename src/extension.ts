import * as vscode from "vscode";

import boilerplatecode from "./json/boilerplatecode.json";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  /**
   * * Creating and Registering the command
   */
  const helloWorld = vscode.commands.registerCommand("vsus.welcome", () => {
    vscode.window.showInformationMessage("Welcome to VSUS");

    console.log(boilerplatecode);
  });

  /**
   * TODO: Auto Completion of Boiler Plate Code
   * @Rajendra
   * @Ujjwal
   * @Saurav
   */
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
  });
  /**
   * TODO: Notification Sample
   * @Susheel
   */
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
    helloWorld,
    showErrorNotification,
    showInfoNotification,
    showWarningNotification
  );
}

export function deactivate() {}
