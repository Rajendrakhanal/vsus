import * as vscode from "vscode";
import * as path from "path";

import { createFile } from "../utils/createFile";
import { createFolder } from "../utils/createFolder";

import * as starterFile from "./staterContent.json";

export namespace nodeProject {
  const projectDetails = starterFile.node;

  export const create = (destination: string) => {
    projectDetails.dir.forEach((folderName: string) => {
      try {
        createFolder(destination, folderName);
      } catch (error) {
        console.log(error);
      }
    });

    projectDetails.files.forEach((file) => {
      const { name, parent, content } = file;

      const fileContent = content.join("");
      if (parent == "") {
        createFile(destination, name, fileContent);
      } else {
        createFile(path.join(destination, parent), name, fileContent);
      }
    });

    const terminal = vscode.window.createTerminal();
    terminal.show();
    terminal.sendText(`cd ${destination}`);
    terminal.sendText(`npm init --yes`);
    terminal.sendText(`npm i express dotenv morgan nodemon mongoose`);

    vscode.window.showInformationMessage("Node project created successfully");
  };
}
