import * as vscode from "vscode";

export abstract class WebViewPanel {
  protected viewPanelInstance: vscode.WebviewPanel;
  abstract viewPanelHTML: string;

  public constructor(typeOfPanel: string, nameOfPanel: string) {
    this.viewPanelInstance = vscode.window.createWebviewPanel(
      typeOfPanel,
      nameOfPanel,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );
  }

  abstract setWebViewPanelHTMLContent(data: string[]): void;
}
