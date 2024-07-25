// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Create an instance of an Express application
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Google Generative AI API key and model name
const apiKey = "API_KEY";
const modelName = "gemini-1.5-flash";

// Endpoint to generate content using Google Generative AI
app.post("/generate", async (req, res) => {
  // Extract the prompt from the request body
  const { prompt } = req.body;

  try {
    // Initialize the Google Generative AI client with the API key
    const genAI = new GoogleGenerativeAI(apiKey);
    // Get the specified generative model
    const model = genAI.getGenerativeModel({ model: modelName });

    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    // Send the generated text back to the client
    res.json({ text });
  } catch (error) {
    // Handle any errors that occur during content generation
    console.error(error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Endpoint to serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
