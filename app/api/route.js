import { setProgress } from '@/actions/database';

export async function POST(request) {
  try {
    const { progress, password } = await request.json();

    if (password !== process.env.NEXT_PUBLIC_PASSWORD) {
      return new Response('Unauthorized', { status: 401 });
    }

    const numProgress = Number(progress);
    if (isNaN(numProgress)) {
      return new Response('Invalid progress', { status: 400 });
    }

    await setProgress(numProgress);

    return new Response('Progress updated', { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return new Response('Server error', { status: 500 });
  }
}
