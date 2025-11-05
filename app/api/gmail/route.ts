import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try{
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.accessToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50",
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

    // This is just workaround to filter currently spam senders in my case, will use built in mehtods form GmailAPi latter in production
    const spamSenders = ["Shoppster", "Google", "Jew", "Kryptosino", "Phil", "Reddit", "JobLeads", "Phil @ZipRecuiter", "Vercel", "Grammarly", "AIApply", "The Frontier"];
    const rawJobTitles = await db.job.findMany({
      select: {
        title: true
      }
    });

    const parsedJobTitles = rawJobTitles.map((j) => j.title);

    console.log("@JOB TITLES", parsedJobTitles)

    let filteredMails = detailed.filter((mail) => {
      return !spamSenders.some((spam) => mail.from.includes(spam));
    });

    // filteredMails = filteredMails.filter((mail) => {
    //   return jobTitles.some((title) => mail.from.includes(title).toLowerCase());
    // })

    return new Response(JSON.stringify(detailed), { status: 200 });
  }
  catch(err){
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
