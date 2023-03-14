import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import admin from 'firebase-admin';
import { adminDb } from '@/utils/firebaseAdmin';

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
});
export const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const prompt = await request.json();

  if (!prompt.prompt) {
    return new NextResponse('No prompt provided !', {
      status: 400,
    });
  } else if (!prompt.chatId) {
    return new NextResponse('No chatId selected !', {
      status: 400,
    });
  } else if (!prompt.model) {
    return new NextResponse('No model selected !', {
      status: 400,
    });
  } else {
    const resp = await openai
      .createCompletion({
        model: `${prompt.model}`,
        prompt: prompt.prompt,
        temperature: prompt.temperature,
        max_tokens: 1000,
      })
      .then((resp) => resp.data.choices[0].text)
      .catch(
        (err) =>
          `The IA was unable to answer your question !\n (Error: ${err.message})`
      );

    const message = {
      text: resp || 'The IA was unable to answer your question !',
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: 'ChatBot',
        name: 'ChatBot',
      },
    };

    await adminDb
      .collection('users')
      .doc(prompt.session?.user?.email)
      .collection('chats')
      .doc(prompt.chatId)
      .collection('messages')
      .add(message);

    return NextResponse.json({
      answer: message.text,
    });
  }
}
