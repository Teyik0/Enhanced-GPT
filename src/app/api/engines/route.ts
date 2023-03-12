import { NextResponse } from 'next/server';
import { openai } from '../route';

export async function GET() {
  const models = await openai.listModels().then((res) => res.data.data);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  return NextResponse.json(modelOptions);
}
