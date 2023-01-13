import * as vscode from "vscode";

export class Terminal {
  private teminalInstance: vscode.Terminal;
  private visibility: boolean;
  
  constructor() {
    this.teminalInstance = vscode.window.createTerminal();
    this.visibility = false;
  }

  private updateTerminalVisibility(): void {
    this.visibility ? this.teminalInstance.show() : this.teminalInstance.hide();
  }

  public runCommand(command: string): void {
    this.teminalInstance.sendText(command);
  }

  public toggleVisibility(): void {
    this.visibility = !this.visibility;
    this.updateTerminalVisibility();
  }
}
