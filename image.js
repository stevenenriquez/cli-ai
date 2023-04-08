import * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import { IMAGE_SIZE } from './constants/image.js';
import { IMAGE_GENERATION_LIMIT } from './constants/image.js';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const userPrompt = process.argv[2];

let generationCount = parseInt(process.argv[3]) || 1;
if(generationCount > IMAGE_GENERATION_LIMIT) {
    console.log(`Generation count cannot exceed ${IMAGE_GENERATION_LIMIT}, setting to ${IMAGE_GENERATION_LIMIT}.`);
    generationCount = IMAGE_GENERATION_LIMIT;
}

let generationSize = IMAGE_SIZE.LARGE.RESOLUTION;
switch(process.argv[4]) {
    case IMAGE_SIZE.SMALL.NAME:
        generationSize = IMAGE_SIZE.SMALL.RESOLUTION;
        break;
    case IMAGE_SIZE.MEDIUM.NAME:
        generationSize = IMAGE_SIZE.MEDIUM.RESOLUTION;
        break;
    case IMAGE_SIZE.LARGE.NAME:
        generationSize = IMAGE_SIZE.LARGE.RESOLUTION;
        break;
}

const imageResponse = await openai.createImage({
    prompt: userPrompt,
    n: generationCount,
    size: generationSize,
});

console.log(imageResponse.data.data.map(image => image.url))