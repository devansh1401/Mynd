import { ChatGroq } from "@langchain/groq";
import { z } from "zod";

import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers";

import { PromptTemplate } from "@langchain/core/prompts";



const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
            .string()
            .describe('the mood of the person who wrote the journal entry.'),
        subject: z.string().describe('the subject of the journal entry.'),
        negative: z
            .boolean()
            .describe(
                'is the journal entry negative? (i.e. does it contain negative emotions?).'
            ),
        summary: z.string().describe('quick summary of the entire entry.'),
        color: z
            .string()
            .describe(
                'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
            ),
        sentimentScore: z
            .number()
            .describe(
                'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
            ),
    })
)

const getPrompt = async (content) => {
    console.log("Content received by getPrompt:", content);

    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
            'Analyze the following journal entry. Follow the intructions  and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })
    const input = await prompt.format({
        entry: content,
    })

    return input
}

export const analysis = async (entry) => {
    console.log("Received entry:", entry); // Log the received entry
    const input = await getPrompt(entry);
    console.log("Formatted input:", input); // Log the formatted input

    const model = new ChatGroq({
        temperature: 0.2,
        apiKey: process.env.GROQ_API_KEY,
    });

    const response = await model.invoke(input);
    console.log("Model response:", response); // Log the model response

    return response;
};