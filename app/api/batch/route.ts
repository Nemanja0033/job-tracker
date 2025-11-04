import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { recordIds, status } = body;
    const allowedValues = ["REJECTED", "INTERVIEW"];

    if (!recordIds || recordIds.length < 1) {
      return NextResponse.json({ error: "Record IDs not found" }, { status: 400 });
    }

    if (!allowedValues.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    for (const id of recordIds) {
      await db.job.update({
        where: { id },
        data: { status }
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
