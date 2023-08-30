import { OpenAI } from "langchain/llms/openai";
import {StructuredOutputParser} from "langchain/output_parsers"
import {z} from "zod";
import { PromptTemplate } from "langchain/prompts";;

// describe a schema for the output of the AI
const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('The mood of the person who wrote the journal entry.'),
        subject: z.string().describe('The subject of the journal entry.'),
        summary: z.string().describe('A summary of the journal entry.'),
        negative: z.boolean().describe('Whether the journal entry is negative.'),
        // color: z.string().describe('A hexadecimal color code representing the mood of the journal entry. Example being string "#FF0000" for red representing anger.'),
        color: z.string().describe('a hexidecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness.'),
    })
)

const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template: 'Analyze the following journal entry. Follow the intructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: {format_instructions},
    });
    
    const input = await prompt.format({
        entry: content,
    })
    return input;
}


export const analyse = async (content) => {
    const input = await getPrompt(content);
    // temperature describes how "creative" the AI is allowed to be. 0 is the least creative, 1 is the most creative.
    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'});
    const result = await model.call(input);

    try {
        return parser.parse(result);
    } catch (error) {
        console.error(error);
    }

}