"use client"
import { FileImportForm } from "@/features/jobs-import/components/ImportForm";
import { JobsTable } from "@/features/jobs-display/components/JobsTable";
import Loader from "@/components/Loader";
import { useFetchJobs } from "@/features/jobs-display/hooks/useFetchJobs";
import { Info } from "lucide-react";

export default function Home() {
  const { jobs, isLoading } = useFetchJobs();

  if(isLoading){
    return <Loader />
  }

  return (
    <div className="w-full h-screen flex justify-center overflow-auto">
      <div className="w-5xl p-3 gap-2">
        <div className="flex w-full justify-between">
          <span className="flex gap-2 text-xs text-gray-400 items-center"><Info size={15} /> Supported files to import is .txt files, and must contain "-" between each job title.</span>
          <FileImportForm />
        </div>
        <JobsTable  jobs={jobs ?? []} />
      </div>
    </div>
  );
}
