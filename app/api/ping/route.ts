import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    message: 'pong! welcome to dresume.me',
    status: 200,
    data: null,
  });
}
