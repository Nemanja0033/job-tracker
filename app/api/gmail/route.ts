import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const listData = await listRes.json();
  const messages = listData.messages || [];

  const detailed = await Promise.all(
    messages.map(async ({ id }: { id: string }) => {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      const msg = await msgRes.json();
      const subject = msg.payload.headers.find((h: any) => h.name === "Subject")?.value;
      const from = msg.payload.headers.find((h: any) => h.name === "From")?.value;
      return { id, subject, from, snippet: msg.snippet };
    })
  );

  return new Response(JSON.stringify(detailed), { status: 200 });
}
