import express, {response} from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();


//New 
 const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
 });


// GET route
router.route('/').get((req, res) => {
    res.send('Hello From DALL-E!');
});

// POST route
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        // Corrected typo: changed 'date' to 'data'
        const image = aiResponse.data.data[0].b64_json;


        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);

        // Ensure fallback error message
        res.status(500).send(error?.response.data.error.message);

    }
});

export default router;
