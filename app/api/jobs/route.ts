import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try{
        const jobs = await db.job.findMany({
          orderBy: { appliedAt: "desc"}
        });

        return NextResponse.json({ jobs }, { status: 200});
    }
    catch(err){
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
      const file = formData.get("text") as File;
  
      if (!file) {
        return NextResponse.json({ error: "No file received" }, { status: 400 });
      }
  
      const text = await file.text();
      const jobs = text
        .split("-")
        .map((title) => title.trim())
        .filter((title) => title.length > 0);
  
      await Promise.all(
        jobs.map((title) =>
          db.job.create({ data: { title, status: "APPLIED" } })
        )
      );
  
      return NextResponse.redirect(new URL("/", req.url));
    } catch (err) {
      console.error("Upload error:", err);
      return NextResponse.json({ error: "Uploaded file contains duplicates!" }, { status: 500 });
    }
  }