import * as vscode from "vscode";
import { getApiKey } from "./getApiKey";

/* eslint-disable @typescript-eslint/naming-convention */
const { Configuration, OpenAIApi } = require("openai");

export async function askOpenAI(question: string | undefined) {
  try {
    const configuration = new Configuration({
      apiKey: getApiKey(),
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.9,
      max_tokens: 500,
    });

    if (response.status === 200) {
      return response.data.choices[0].text;
    }
  } catch (error: any) {
    console.log(error);
    vscode.commands.executeCommand(
      "vsus.showErrorNotification",
      "Some error occured while generating answer to you question."
    );
  }
}
