import * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import { MODEL } from '../constants/model.js';
import { DEFAULT_TEMPERATURE } from '../constants/chat.js';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
    model: MODEL.DAVINCI,
    prompt: process.argv[2],
    temperature: parseFloat(process.argv[3]) || DEFAULT_TEMPERATURE
});

console.log(response.data.choices[0].text);