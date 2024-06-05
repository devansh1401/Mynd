// import groq from "groq";
import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { Document } from 'langchain/document'
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";


const jsonSchema = z.object({
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
    // sentimentScore: z
    //     .number()
    //     .describe(
    //         'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
    //     ),
})

const parser = StructuredOutputParser.fromZodSchema(jsonSchema)

const getPrompt = async (content) => {
    console.log("Content received by getPrompt:", content);

    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
            ' Analyze the following journal entry. Follow the intructions  and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })
    const input = await prompt.format({
        entry: content,
    })

    return input
}

export const analyse = async (entry) => {
    console.log("Received entry:", entry); // Log the received entry
    const input = await getPrompt(entry);
    console.log("Formatted input:", input); // Log the formatted input

    const model = new ChatGroq({
        temperature: 0.2,
        // model: "llama3-8b-8192",
        apiKey: process.env.GROQ_API_KEY,
    });

    const response = await model.invoke(input);
    console.log("Model response:", response); // Log the model response

    // Extract the JSON string from the response content
    const jsonStringStart = response.lc_kwargs.content.indexOf('{');
    const jsonStringEnd = response.lc_kwargs.content.lastIndexOf('}');
    let jsonString = response.lc_kwargs.content.substring(jsonStringStart, jsonStringEnd + 1);

    jsonString = jsonString.replace(/\/\/.*$/gm, ''); // Removes lines starting with //


    // Parse the extracted JSON string
    let contentJson;
    try {
        contentJson = JSON.parse(jsonString);
    } catch (error) {
        console.error("Failed to parse model response as JSON:", error);
        throw new Error("Model response could not be parsed as JSON.");
    }

    console.log("Parsed content:", contentJson);

    // Validate the parsed content against the JSON schema
    const validationResult = jsonSchema.safeParse(contentJson);
    if (!validationResult.success) {
        console.error("Validation error details:", validationResult.error);
        throw new Error("Validation failed");
    }

    console.log("Validated content:", validationResult.data);
    return validationResult.data;
};

export const qa = async (question, entries) => {
    const docs = entries.map((entry) => {
        return new Document({
            pageContent: entry.content,
            metadata: { id: entry.id, date: entry.createdAt }
        })
    })

    //  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const model = new ChatGroq({
        temperature: 0.2,
        apiKey: process.env.GROQ_API_KEY,
    })
    const chain = loadQARefineChain(model)
    // const embeddings = new OpenAIEmbeddings()
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "embedding-001", // 768 dimensions
        apiKey: process.env.GOOGLE_API_KEY,
    });
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const relevantDocs = await store.similaritySearch(question)
    console.log("relevantDocs", relevantDocs)
    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    })
    console.log("res", res)
    return res
}

// const embeddings = new GoogleGenerativeAIEmbeddings({
//     model: "embedding-001", // 768 dimensions
//     apiKey: process.env.GROQ_API_KEY,
// });





// export const analyse = async (entry) => {
//     console.log("Received entry:", entry); // Log the received entry
//     const input = await getPrompt(entry);
//     console.log("Formatted input:", input); // Log the formatted input

//     const model = new ChatGroq({
//         temperature: 0.2,
//         model: "llama3-8b-8192",
//         apiKey: process.env.GROQ_API_KEY,
//     });

//     const response = await model.invoke(input);
//     console.log("Model response:", response); // Log the model response


//     // Assuming the AI model always returns an array and you're interested in the first object
//     const contentArray = JSON.parse(response.lc_kwargs.content);
//     console.log("fuccckkkk", response.lc_kwargs.content);
//     console.log("Parsed content array:", contentArray);
//     if (contentArray.length === 0) {
//         throw new Error("No content received from the AI model.");
//     }
//     // const contentJson = contentArray[0]; // Take the first object from the array
//     const contentJson = JSON.parse(response.lc_kwargs.content);
//     console.log("Parsed content:", contentJson);

//     const validationResult = jsonSchema.safeParse(contentJson);
//     if (!validationResult.success) {
//         console.error("Validation error details:", validationResult.error);
//         throw new Error("Validation failed");
//     }

//     console.log("Validated content:", validationResult.data);
//     return validationResult.data;


//     // Extract the relevant content from the model's response
//     const contentJson = JSON.parse(response.lc_kwargs.content);
//     console.log("Parsed content:", contentJson); // Log the parsed content


//     // Validate the extracted content against the JSON schema
//     const validationResult = jsonSchema.safeParse(contentJson);
//     if (!validationResult.success) {
//         console.error("Validation error details:", validationResult.error);
//         throw new Error("Validation fucking failed");
//     }

//     // At this point, validationResult.data contains the validated content
//     console.log("Validated content:", validationResult.data);
//     return validationResult.data;
//};





