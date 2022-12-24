import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Write a short poem
Include the words:
`;
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
    console.log(req.body.userInput.length)

    const baseCompletion = await openai.createCompletion ({
        model: 'text-davinci-003',
        prompt:  `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.69,
        max_tokens: 200,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({output: basePromptOutput });
};

export default generateAction;