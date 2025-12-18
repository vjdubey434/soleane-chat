import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { messages = [] } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are the Soleane Candles website assistant. Help customers choose scents, explain products, candle care, shipping, and returns. Be warm and concise. If unsure, ask a clarifying question. Do not invent info.",
        },
        ...messages,
      ],
    });

    return Response.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
