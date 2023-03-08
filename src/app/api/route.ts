import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
});
export const openai = new OpenAIApi(config);

export async function GET() {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Give me a rare animal in french',
    temperature: 0.8,
  });
  if (completion.status === 200) {
    return NextResponse.json(completion.data);
  } else throw new Error('Error');
}
export async function POST(request: Request) {
  const answer = await request.json();
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: answer.question,
    temperature: 0.4,
    max_tokens: 400,
  });
  if (completion.status === 200) {
    return NextResponse.json(completion.data);
  } else throw new Error('Error');
}
