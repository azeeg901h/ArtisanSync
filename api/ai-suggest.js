export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query } = req.body;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-5',
                max_tokens: 300,
                messages: [{
                    role: 'user',
                    content: `A client described their project as: "${query}". 
                    Recommend which type of professional they need from:
                    A client described their project as: "${query}"

Based on this, recommend which type of professional(s) they need from this list: Painter, Freight Operator, Structural Machinist, Electrician, Tiler, Welder, Plumber, Carpenter, Mason.

Give a short, friendly, plain-English response (2-3 sentences max). Name the professional type clearly, briefly explain why, and mention a rough daily rate in Naira if relevant. Do not use bullet points or headers.`
                }]
            })
        });

        const data = await response.json();
        const reply = data.content?.[0]?.text || "No suggestion available.";

        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(500).json({ error: 'AI error' });
    }
}