import { WebViewPanel } from "../components/abstract/webViewPanel";
import { askOpenAI } from "../utils/askOpenAI";
import { showInputBox } from "./showInputBox";

export class AVSUS extends WebViewPanel {
  viewPanelHTML: string;
  private question: string | undefined;
  private answer: string | undefined;

  public constructor() {
    super("Ask VSUS", "AskVSUS");
    this.viewPanelHTML = this.getWebviewContent("", "");
  }

  setWebViewPanelHTMLContent(data: (string | undefined)[]): void {
    this.viewPanelHTML = this.getWebviewContent(data[0], data[1]);
  }

  public showWebView() {
    this.viewPanelInstance.webview.html = this.viewPanelHTML;
  }

  public async askQuestion() {
    this.question = await showInputBox("Enter your question...", "Question");
    if (typeof this.question === undefined) {
      this.answer = "Invalid Question";
    } else {
      this.answer = await askOpenAI(this.question);
      console.log(this.answer);
    }

    this.setWebViewPanelHTMLContent([this.question, this.answer]);
    return this.answer;
  }

  private getWebviewContent(
    question: string | undefined,
    response: string | undefined
  ): string {
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
}
