import * as vscode from "vscode";
import { WebViewPanel } from "../components/abstract/webViewPanel";

export class Project extends WebViewPanel {
  viewPanelHTML: string;
  public constructor() {
    super("Create Project", "Create Project");
    this.viewPanelHTML = this.getWebViewContent();
  }

  setWebViewPanelHTMLContent(data: string[]): void {
    this.viewPanelHTML = this.getWebViewContent();
  }

  public showWebView() {
    this.viewPanelInstance.webview.html = this.viewPanelHTML;
  }

  private getWebViewContent(): string {
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
        background-color:  #2D2B55;
    }

    
      </style>
    </head>
    
    <body>
    <div id="data">Hello</div>
    <button id="click">Click me</button>
    <script>
    let data = document.getElementById("data");
    data.textContent = "Susheel";
    </script>

    </body>
    
    </html>
  `;
  }
}
