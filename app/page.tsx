"use client"
import { JobsTable } from "@/features/jobs-display/components/JobsTable";
import Loader from "@/components/Loader";
import { useFetchJobs } from "@/features/jobs-display/hooks/useFetchJobs";

export default function Home() {
  const { jobs, isLoading } = useFetchJobs();

  if(isLoading){
    return <Loader type="NORMAL" />
  }

  return (
    <main className="w-full h-screen flex justify-center items-start overflow-auto">
      <div className="w-5xl p-3 grid place-items-center gap-5">
        <JobsTable  jobs={jobs ?? []} />
      </div>
    </main>
  );
}
