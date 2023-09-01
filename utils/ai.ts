import { OpenAI } from "langchain/llms/openai";
import {StructuredOutputParser} from "langchain/output_parsers"
import {z} from "zod";
import { PromptTemplate } from "langchain/prompts";;
import {Document} from 'langchain/document'
import {loadQARefineChain} from 'langchain/chains'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {MemoryVectorStore} from 'langchain/vectorstores/memory'

// describe a schema for the output of the AI
const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
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

// Finds the most similar journal entries to the question, using
// the embeddings of the journal entries and the question
// aka vector similarity search
export const qa = async (question, entries) => {
    const docs = entries.map(
      (entry) =>
        new Document({
          pageContent: entry.content,
          metadata: { source: entry.id, date: entry.createdAt },
        })
    )
    console.log('embedding')
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings()
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const relevantDocs = await store.similaritySearch(question)
    const res = await chain.call({
      input_documents: relevantDocs,
      question,
    })
  
    return res.output_text
  }