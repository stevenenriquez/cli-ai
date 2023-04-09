# cli-ai
## First Steps
1. Clone this repo 
2. Navigate to the directory `cli-ai` where you cloned this repository
3. Make a new file with the name `.env`
    * The `.env` file is mentioned in this repo's `.gitignore` to help you not accidently commit any values in this file. Remember, **do not commit this file**
2. Go to openai.com, login and retrieve your API token
3. Add the following text to your `.env` file: `OPENAI_API_KEY={ADD_YOUR_KEY_HERE}`

## chat.js
Run OpenAI's ChatGPT within your terminal. Within a given session, your messages will be used as context for following messages.
* Simply run
  * `node chat.js`

## image.js
Run DALLE2 in within your terminal
* Command: `node image.js '{your_prompt_here}' {number_of_images_to_generate} {image_size}`
  * 1st argument: Your prompt
    * **required**
    * Write your prompt as a string (ex: `'my prompt'`)
  * 2nd argument: Number of images to generate
    * **optional, defaults to 1**
    * If included, must be a number between 1 and 10
  * 3rd argument: Image size
    * **optional, defaults to `large`**
    * Valid values: 
      * `small` (256x256)
      * `medium` (512x512)
      * `large` (1024x1024)
* Example: `node image.js 'a lucid dreamer flying through clouds' 3 large`

## text.js
Run OpenAI's text completion API in your terminal. Default model is `text-davinci-003`
* Command `node text.js '{your_prompt_here}`
