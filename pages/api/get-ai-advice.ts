// pages/api/get-ai-advice.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Initialize OpenAI with your API key from environment variables
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Your body should include playerHand, flop, turn, river
    const { playerHand, flop, turn, river } = req.body;
    
    // Construct the messages for OpenAI prompt
    const messages = [
      { role: "system", content: "Your poker strategy advice session has started." },
      // Add other context messages if necessary
      { role: "user", content: `I have ${playerHand.join(', ')}, and the board shows ${flop.concat(turn).concat(river).join(', ')}.` }
    ];

    try {
      // Setting headers for SSE
      res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      });

      // Create a stream to OpenAI API
      const completion = openai.createChatCompletion({
        model: "gpt-4",
        messages: messages,
        stream: true,
      });

      // Handle data events
      completion.on('data', (data) => {
        if (data.choices && data.choices.length > 0) {
          res.write(`data: ${JSON.stringify(data.choices[0].message.content)}\n\n`);
        }
      });

      // Handle stream end
      completion.on('end', () => {
        res.end();
      });

    } catch (error) {
      console.error('Error connecting to OpenAI:', error);
      res.status(500).end();
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    }
}
