// app/api/chat/route.js

export async function POST(req) {
  const { message } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Missing OpenAI API key' }),
      { status: 500 }
    );
  }

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await apiRes.json();

    if (data.error) {
      return new Response(
        JSON.stringify({ error: data.error.message }),
        { status: 500 }
      );
    }

    const reply = data.choices?.[0]?.message?.content || 'No response.';

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
      status: 500,
    });
  }
}