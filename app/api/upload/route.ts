import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';
export const runtime = 'edge';
const utapi = new UTApi();

export async function POST(req: Request) {
  if (!process.env.UPLOADTHING_SECRET) {
    return new Response(
      "Missing UPLOADTHING_SECRET. Don't forget to add that to your .env file.",
      {
        status: 401,
      }
    );
  }

  // console.log(req.body)

  const file = req.body || '';
  const filename = req.headers.get('x-vercel-filename') || 'file.txt';
  const contentType = req.headers.get('content-type') || 'text/plain';
  const fileType = `.${contentType.split('/')[1]}`;

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? filename
    : `${filename}${fileType}`;

  const fileData = await new Response(file).arrayBuffer();

  const upload = await utapi.uploadFiles(
    new File([new Uint8Array(fileData)], finalName)
  );
  return NextResponse.json(
    {
      url: upload.data?.url,
    },
    {
      status: 200,
    }
  );
}
