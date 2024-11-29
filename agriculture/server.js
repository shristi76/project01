const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Example endpoint for the chatbot
app.post('/chatbot', (req, res) => {
    const userQuery = req.body.query;

    // Process the query here, for now just echoing back the query
    let response = `You asked: ${userQuery}. Here's a response from the chatbot!`;

    res.json({ reply: response });
});

app.listen(port, () => {
    console.log(`Chatbot server running at http://localhost:${port}`);
});
