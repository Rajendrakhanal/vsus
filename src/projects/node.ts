import * as vscode from "vscode";
import * as path from "path";

import { createFile } from "../utils/createFile";
import { createFolder } from "../utils/createFolder";

import * as starterFile from "./staterContent.json";
import { showInputBox } from "../utils/showInputBox";
import { Terminal } from "../components/terminal";

export namespace nodeProject {
  const projectDetails = starterFile.node;

  export const create = async(destination: string) => {

    const projectName = await showInputBox(
      "Name of your project. Example: hello-world",
      "Enter name of your project"
    );
    
    destination = destination + "/" +projectName;
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
      if (parent === "") {
        createFile(destination, name, fileContent);
      } else {
        createFile(path.join(destination, parent), name, fileContent);
      }
    });


    const nodejsTerminal = new Terminal();

    nodejsTerminal.toggleVisibility();

    nodejsTerminal.runCommand(`cd ${destination}`);
    nodejsTerminal.runCommand(`npm init --yes`);
    nodejsTerminal.runCommand(`npm i express dotenv morgan nodemon mongoose`);


    vscode.commands.executeCommand(
      "vsus.showInfoNotification",
      "Node project created successfully"
    );
  };
}
