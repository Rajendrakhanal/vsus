import * as vscode from "vscode";
import * as path from "path";

import { createFile } from "../utils/createFile";
import { createFolder } from "../utils/createFolder";

import * as starterFile from "./staterContent.json";

export namespace cppProject {
  const projectDetails = starterFile.cpp;

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
      if (parent === "src") {
        createFile(path.join(destination, parent), name, content);
      } else {
        createFile(destination, name, content);
      }
    });

    vscode.window.showInformationMessage("CPP project created successfully");
  };
}
