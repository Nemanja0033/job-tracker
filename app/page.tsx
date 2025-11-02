import { FileImportForm } from "@/components/FileImportButtons";
import { JobsTable } from "@/components/JobsTable";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export interface Job {
  id: string
  title: string,
  appliedAt: Date | any,
  status: string
}

export default async function Home() {
  const jobs = await db.job.findMany({
    orderBy: {
      appliedAt: "desc"
    }
  });

  if(!jobs) notFound();

  console.log(jobs)

  return (
    <div className="w-full h-screen flex justify-center overflow-hidden">
      <div className="w-5xl p-3 gap-2  overflow-auto">
        <FileImportForm />
        <JobsTable  jobs={jobs} />
      </div>
    </div>
  );
}
