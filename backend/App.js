import { OpenAI } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

// Configure CORS to allow requests from the client's origin
app.use(cors({
  origin: "https://code-generator-vert.vercel.app",
  methods: ["POST", "GET"],
  credentials: true
}));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const prompt = `Complete this incomplete code which fulfills the functionality of this code and also provide comments to understand the code dont change the code just complete it and if it has any syntax errors correct it Understand the entire code analyse the purpose of the code and then give the complete code that can be directly used to run`;

app.get("/", (req, res) => {
    res.json("Hello");
});

app.options('/message', cors()); // Handle preflight requests

app.post('/message', async(req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
          {
            "role": "user",
            "content": prompt + req.body.message
          }
        ],
      max_tokens: 2048,
    });
    res.send(completion.choices[0]);
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
