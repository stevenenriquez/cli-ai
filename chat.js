import * as dotenv from 'dotenv';
dotenv.config();
import readline from 'readline-sync';
import { Configuration, OpenAIApi } from "openai";
import { MODEL } from './constants/model.js';
import { CHAT_EXIT_CMD, CHAT_PREFIX_ASSISTANT, CHAT_PREFIX_USER } from './constants/chat.js';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const CHAT_MODEL = MODEL.GPT_3_5_TURBO;
const MAX_CHAT_REQUESTS = 10;

let requestCount = 0;
const history = [];
const messages = [];

console.log('\nWelcome to ChatBot. Type "exit" to quit.\n');

while(requestCount < MAX_CHAT_REQUESTS) {
    requestCount++;
    let userInput = readline.question(CHAT_PREFIX_USER);

    if(userInput.trim().toLowerCase() === CHAT_EXIT_CMD) {
        console.log('\nGoodbye!\n');
        break;
    }

    for (const [input, completion] of history) {
        messages.push({role: "user", content: input});
        messages.push({role: "assistant", content: completion});
    }

    messages.push({role: "user", content: userInput});

    try {
        const chatCompletion = await openai.createChatCompletion({
            model: CHAT_MODEL,
            messages: messages
        });

        let completion = chatCompletion.data.choices[0].message.content;
        console.log(`\n${CHAT_PREFIX_ASSISTANT} ${completion}\n`)

        history.push([userInput, completion]);
    } catch (error) {
        if(error.response) {
            console.error(`ERROR ${error.response.status}: ${error.response.data}`);
        } else {
            console.error(`ERROR: ${error.message}`);
        }
    }
}

console.log(`Maximum calls reached. Goodbye!\n`);