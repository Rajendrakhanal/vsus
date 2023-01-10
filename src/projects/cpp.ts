import path = require("path");
import * as vscode from "vscode";
import { createFile } from "../utils/createFile";
import { createFolder } from "../utils/createFolder";

export namespace cppProject {
  const projectDetails = {
    makefile: true,
    mainCpp: true,
    dir: [".vscode", "bin", "include", "lib", "src"],
    files: [
      {
        name: "main.cpp",
        parent: "src",
        content:
          "#include <iostream>\n\nint main(int argc, char **argv) {\n\tstd::cout << 'Enjoy :)' << std::endl;\n\treturn 0;\n}",
      },
      {
        name: "Makefile",
        content:
          "CC\t\t:= g++\nC_FLAGS := -std=c++17 -Wall -Wextra\n\nBIN\t\t:= bin\nSRC\t\t:= src\nINCLUDE\t:= include\nLIB\t\t:= lib\n\nLIBRARIES\t:=\n\nifeq ($(OS),Windows_NT)\nEXECUTABLE\t:= main.exe\nelse\nEXECUTABLE\t:= main\nendif\n\nall: $(BIN)/$(EXECUTABLE)\n\nclean:\n\t$(RM) $(BIN)/$(EXECUTABLE)\n\nrun: all\n\t./$(BIN)/$(EXECUTABLE)\n\n$(BIN)/$(EXECUTABLE): $(SRC)/*\n\t$(CC) $(C_FLAGS) -I$(INCLUDE) -L$(LIB) $^ -o $@ $(LIBRARIES)",
      },
    ],
  };

  export const create = async (destination: string) => {
    projectDetails.dir.forEach(async (folderName: string) => {
      try {
        await createFolder(destination, folderName);
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

    vscode.window.showInformationMessage("CPP project create successfully");
  };
}
