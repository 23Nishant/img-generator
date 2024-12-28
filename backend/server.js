const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Create OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test the API key on startup
const testAPIKey = async () => {
  try {
    console.log('Testing OpenAI connection...');
    const response = await openai.models.list();
    console.log('OpenAI connection successful!');
    return true;
  } catch (error) {
    console.error('OpenAI API Key Test Failed:', error.message);
    return false;
  }
};

const generateImage = async (prompt) => {
  try {
    console.log('Starting image generation...');
    console.log('Using API Key:', process.env.OPENAI_API_KEY.substring(0, 7) + '...');
    
    // Log the request parameters
    console.log('Request parameters:', {
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    console.log('Raw API Response:', JSON.stringify(response, null, 2));

    if (!response.data || response.data.length === 0) {
      throw new Error('No data received from OpenAI');
    }

    return response.data[0].b64_json;
  } catch (error) {
    // Log detailed error information
    console.error('Detailed error information:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.status,
      headers: error.response?.headers
    });
    throw error;
  }
};

app.post("/generateImage", async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    if (!req.body.prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const image = await generateImage(req.body.prompt);
    
    if (!image) {
      throw new Error('No image data generated');
    }

    res.json({ image });
  } catch (error) {
    console.error('Error in /generateImage endpoint:', error);
    res.status(500).json({
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
});

// Start server with API key test
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const apiKeyValid = await testAPIKey();
  console.log('API Key Status:', apiKeyValid ? '✅ Valid' : '❌ Invalid');
});