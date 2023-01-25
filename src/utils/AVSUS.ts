import * as vscode from "vscode";

import { Configuration, OpenAIApi } from "openai";
import createPrompt from "../prompt";

type AuthInfo = { apiKey?: string };
export type Settings = {
  selectedInsideCodeblock?: boolean;
  pasteOnClick?: boolean;
  model?: string;
  maxTokens?: number;
  temperature?: number;
};

export class askVSUSViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "askVSUS.chatView";
  private _view?: vscode.WebviewView;

  private _openai?: OpenAIApi;

  private _response?: string;
  private _prompt?: string;
  private _fullPrompt?: string;
  private _currentMessageNumber = 0;

  private _settings: Settings = {
    selectedInsideCodeblock: false,
    pasteOnClick: true,
    maxTokens: 500,
    temperature: 0.5,
  };
  private _apiConfiguration?: Configuration;
  private _apiKey?: string;

  // In the constructor, we store the URI of the extension
  constructor(private readonly _extensionUri: vscode.Uri) {}

  // Set the session token and create a new API instance based on this token
  public setAuthenticationInfo(authInfo: AuthInfo) {
    this._apiKey = authInfo.apiKey;
    this._apiConfiguration = new Configuration({ apiKey: authInfo.apiKey });
    this._newAPI();
  }

  public setSettings(settings: Settings) {
    this._settings = { ...this._settings, ...settings };
  }

  public getSettings() {
    return this._settings;
  }

  // This private method initializes a new ChatGPTAPI instance, using the session token if it is set
  private _newAPI() {
    if (!this._apiConfiguration || !this._apiKey) {
      console.warn(
        "API key not set, please go to extension settings (read README.md for more info)"
      );
    } else {
      this._openai = new OpenAIApi(this._apiConfiguration);
    }
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    // set options for the webview, allow scripts
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    // set the HTML for the webview
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // add an event listener for messages received by the webview
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "codeSelected": {
          // do nothing if the pasteOnClick option is disabled
          if (!this._settings.pasteOnClick) {
            break;
          }
          let code = data.value;
          code = code.replace(/([^\\])(\$)([^{0-9])/g, "$1\\$$$3");
          // insert the code as a snippet into the active text editor
          vscode.window.activeTextEditor?.insertSnippet(
            new vscode.SnippetString(code)
          );
          break;
        }
        case "prompt": {
          this.search(data.value);
        }
      }
    });
  }

  public async resetSession() {
    this._prompt = "";
    this._response = "";
    this._fullPrompt = "";
    this._view?.webview.postMessage({ type: "setPrompt", value: "" });
    this._view?.webview.postMessage({ type: "addResponse", value: "" });
    this._newAPI();
  }

  public async search(prompt?: string) {
    this._prompt = prompt;
    if (!prompt) {
      return;
    }

    // Check if the ChatGPTAPI instance is defined
    if (!this._openai) {
      this._newAPI();
    }

    // focus gpt activity from activity bar
    if (!this._view) {
      await vscode.commands.executeCommand("askVSUS.chatView.focus");
    } else {
      this._view?.show?.(true);
    }

    let response = "";
    this._response = "";
    // Get the selected text of the active editor
    const selection = vscode.window.activeTextEditor?.selection;
    const selectedText =
      vscode.window.activeTextEditor?.document.getText(selection);
    let searchPrompt = createPrompt(prompt, this._settings, selectedText);
    this._fullPrompt = searchPrompt;

    if (!this._openai) {
      response =
        "[ERROR] API token not set, please go to extension settings to set it (read README.md for more info)";
    } else {
      // If successfully signed in
      console.log("sendMessage");

      // Make sure the prompt is shown
      this._view?.webview.postMessage({
        type: "setPrompt",
        value: this._prompt,
      });
      this._view?.webview.postMessage({
        type: "addResponse",
        value: "Loading . . .",
      });

      // Increment the message number
      this._currentMessageNumber++;

      let agent = this._openai;

      try {
        let currentMessageNumber = this._currentMessageNumber;

        // Send the search prompt to the OpenAI API and store the response
        const completion = await this._openai.createCompletion({
          model: this._settings.model || "code-davinci-002",
          prompt: searchPrompt,
          temperature: this._settings.temperature,
          max_tokens: this._settings.maxTokens,
          stop: ["\nUSER: ", "\nUSER", "\nASSISTANT"],
        });

        if (this._currentMessageNumber !== currentMessageNumber) {
          return;
        }

        response = completion.data.choices[0].text || "";
        response += `\n\n---\n`;
        if (completion.data.choices[0].finish_reason === "length") {
          response += `\n[WARNING] The response was truncated because it reached the maximum number of tokens. You may want to increase the maxTokens setting.\n\n`;
        }
        // response += `Tokens used: ${completion.data.usage?.total_tokens}`;
      } catch (error: any) {
        let e = "";
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          e = `${error.response.status} ${error.response.data}`;
        } else {
          console.log(error.message);
          e = error.message;
        }
        response += `\n\n---\n[ERROR] ${e}`;
      }
    }

    // Saves the response
    this._response = response;

    // Show the view and send a message to the webview with the response
    if (this._view) {
      this._view.show?.(true);
      this._view.webview.postMessage({ type: "addResponse", value: response });
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.js")
    );
    const microlightUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "scripts",
        "microlight.min.js"
      )
    );
    const tailwindUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "scripts",
        "showdown.min.js"
      )
    );
    const showdownUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "scripts",
        "tailwind.min.js"
      )
    );

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<script src="${tailwindUri}"></script>
				<script src="${showdownUri}"></script>
				<script src="${microlightUri}"></script>
				<style>
				.code {
					white-space: pre;
				}
        #prompt-input{
          border: 2px solid aqua;
        }
				p {
					padding-top: 0.4rem;
					padding-bottom: 0.4rem;
				}
				/* overrides vscodes style reset, displays as if inside web browser */
				ul, ol {
					list-style: initial !important;
					margin-left: 10px !important;
				}
				h1, h2, h3, h4, h5, h6 {
					font-weight: bold !important;
				}
				</style>
			</head>
			<body>
      <br>
				<input class="h-10 w-full text-white bg-stone-700 p-4 text-sm" placeholder="Ask something" id="prompt-input" />
				
				<div id="response" class="pt-4 text-sm">
				</div>

				<script src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}
