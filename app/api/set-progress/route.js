import { NextResponse } from 'next/server';
import { setProgress } from '@/actions/database';

export async function POST(request) {
  try {
    const { progress } = await request.json();

    if (typeof progress !== 'number') {
      return NextResponse.json({ error: 'Progress must be a number' }, { status: 400 });
    }

    const result = await setProgress(progress);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('API error setting progress:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
