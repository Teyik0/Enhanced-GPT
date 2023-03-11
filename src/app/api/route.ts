import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
});
export const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const answer = await request.json();
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${answer.question}`,
    temperature: 0.7,
    max_tokens: 1000,
  });
  try {
    if (!completion.data) throw new Error('There was an error');
    return NextResponse.json({
      answer: completion.data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
