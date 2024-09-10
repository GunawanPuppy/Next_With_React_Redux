import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Set the cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("Authorization", token, { httpOnly: true, path: '/user/login' });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
