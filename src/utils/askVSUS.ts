/* eslint-disable @typescript-eslint/naming-convention */
const { Configuration, OpenAIApi } = require("openai");

export async function askVSUS(question: string) {
  try {
    const configuration = new Configuration({
      apiKey: "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",
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
  }
}
