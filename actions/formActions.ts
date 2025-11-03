"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function bulkUpdateJobStatuses(formData: FormData) {
  const ids = formData.getAll("ids") as string[];

  for (const id of ids) {
    const status = formData.get(`status-${id}`) as any;
    if (!status) continue;

    await db.job.update({
      where: { id },
      data: { status },
    });
  }

  revalidatePath("/");
  redirect("/"); 
}
