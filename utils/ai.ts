import { OpenAI } from "langchain/llms/openai";

export const analyse = async (prompt) => {
    console.log('prompt: ', prompt);
    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'});
    const result = await model.call(prompt);
    console.log('result: ', result);

}