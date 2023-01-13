import * as vscode from "vscode";
import * as path from "path";

import { createFile } from "../utils/createFile";
import { createFolder } from "../utils/createFolder";

import * as starterFile from "./staterContent.json";

export namespace cProject {
  const projectDetails = starterFile.c;

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
      if (parent === "src") {
        createFile(path.join(destination, parent), name, fileContent);
      } else {
        createFile(destination, name, fileContent);
      }
    });
    
    vscode.commands.executeCommand(
      "vsus.showInfoNotification",
      "C project created successfully"
    );
  };
}
