const { OpenAI } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT =  3000;
const app = express();
app.use(bodyParser.json());
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const prompt = `Complete this incomplete code which fulfills the functionality of this code and also provide comments to understand the code dont change the code just complete it and if it has any syntax errors correct it Understand the entire code analyse the purpose of the code and then give the complete code that can be directly used to run`;
app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/message', async(req, res) => {
  const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
          {
            "role": "user",
            "content": prompt+req.body.message
          }
        ],
      max_tokens: 2048,
    });
    res.send(completion.choices[0]);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
