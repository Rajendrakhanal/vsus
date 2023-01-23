import * as vscode from "vscode";
import { createProject } from "./projects";

import boilerplatecode from "./json/boilerplatecode.json";
import  { askVSUSViewProvider }  from "./utils/AVSUS";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsus" is now active!');

  let helloWorld = vscode.commands.registerCommand("vsus.startup", () => {
    vscode.commands.executeCommand(
      "vsus.showInfoNotification",
      "Welcome to VSUS!"
    );
  });

  // Create a new askVSUSViewProvider instance and register it with the extension's context
  const provider = new askVSUSViewProvider(context.extensionUri);

  // Get the API session token from the extension's configuration
  const config = vscode.workspace.getConfiguration("askVSUS");
  // Put configuration settings into the provider
  provider.setAuthenticationInfo({
    apiKey: config.get("apiKey"),
  });

  provider.setSettings({
    selectedInsideCodeblock: config.get("selectedInsideCodeblock") || false,
    pasteOnClick: config.get("pasteOnClick") || false,
    maxTokens: config.get("maxTokens") || 500,
    temperature: config.get("temperature") || 0.5,
    model: config.get("model") || "text-davinci-003",
  });

  // Register the provider with the extension's context
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      askVSUSViewProvider.viewType,
      provider,
      {
        webviewOptions: { retainContextWhenHidden: true },
      }
    )
  );

  const commandHandler = (command: string) => {
    const config = vscode.workspace.getConfiguration("askVSUS");
    const prompt = config.get(command) as string;
    provider.search(prompt);
  };

  // Register the commands that can be called from the extension's package.json
  context.subscriptions.push(
    vscode.commands.registerCommand("askVSUS.ask", () =>
      vscode.window
        .showInputBox({ prompt: "What do you want to do?" })
        .then((value) => provider.search(value))
    ),
    vscode.commands.registerCommand("askVSUS.explain", () =>
      commandHandler("promptPrefix.explain")
    ),
    vscode.commands.registerCommand("askVSUS.refactor", () =>
      commandHandler("promptPrefix.refactor")
    ),
    vscode.commands.registerCommand("askVSUS.optimize", () =>
      commandHandler("promptPrefix.optimize")
    ),
    vscode.commands.registerCommand("askVSUS.findProblems", () =>
      commandHandler("promptPrefix.findProblems")
    ),
    vscode.commands.registerCommand("askVSUS.documentation", () =>
      commandHandler("promptPrefix.documentation")
    )
  );

  // Change the extension's settings when configuration is changed
  vscode.workspace.onDidChangeConfiguration(
    (event: vscode.ConfigurationChangeEvent) => {
      if (event.affectsConfiguration("askVSUS.apiKey")) {
        const config = vscode.workspace.getConfiguration("askVSUS");
        provider.setAuthenticationInfo({ apiKey: config.get("apiKey") });
        console.log("API key changed");
      } else if (
        event.affectsConfiguration("askVSUS.selectedInsideCodeblock")
      ) {
        const config = vscode.workspace.getConfiguration("askVSUS");
        provider.setSettings({
          selectedInsideCodeblock:
            config.get("selectedInsideCodeblock") || false,
        });
      } else if (event.affectsConfiguration("askVSUS.pasteOnClick")) {
        const config = vscode.workspace.getConfiguration("askVSUS");
        provider.setSettings({
          pasteOnClick: config.get("pasteOnClick") || false,
        });
      } else if (event.affectsConfiguration("askVSUS.maxTokens")) {
        const config = vscode.workspace.getConfiguration("askVSUS");
        provider.setSettings({ maxTokens: config.get("maxTokens") || 500 });
      } else if (event.affectsConfiguration("askVSUS.temperature")) {
        const config = vscode.workspace.getConfiguration("askVSUS");
        provider.setSettings({ temperature: config.get("temperature") || 0.5 });
      } else if (event.affectsConfiguration("askVSUS.documentation")) {
        const config = vscode.workspace.getConfiguration("askVSUS");
      }
    }
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
    (message) => {
      vscode.window.showInformationMessage(message);
    }
  );
  const showWarningNotification = vscode.commands.registerCommand(
    "vsus.showWarningNotification",
    (message) => {
      vscode.window.showWarningMessage(message);
    }
  );
  const showErrorNotification = vscode.commands.registerCommand(
    "vsus.showErrorNotification",
    (message) => {
      vscode.window.showErrorMessage(message);
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

