import { OpenAI } from "@langchain/openai";
import groq from "groq";
import { ChatGroq } from "@langchain/groq";

export const analysis = async (prompt) => {
    // console.log("Analyzing: ", prompt)
    // const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo', apiKey: process.env.GROQ_API_KEY })
    // const output = await model.invoke(prompt)
    // console.log(output)

    const model = new ChatGroq({
        temperature: 0.9,
        apiKey: process.env.GROQ_API_KEY,
    });

    const response = await model.invoke(prompt);
    console.log(response);

}