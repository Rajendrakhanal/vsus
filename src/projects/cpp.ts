import * as vscode from "vscode";
import { createFile } from "../utils/createFile";
import { createFolder } from "../utils/createFolder";

export namespace cppProject {
  const projectDetails = {
    makefile: true,
    mainCpp: true,
    dir: [".vscode", "bin", "include", "lib", "src"],
  };

  export const create = async (destination: string) => {
    projectDetails.dir.forEach(async (folderName: string) => {
      try {
        await createFolder(destination, folderName);
      } catch (error) {
        console.log(error);
      }
    });
  };
}
