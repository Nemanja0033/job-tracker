"use client"
import { JobsTable } from "@/features/jobs-display/components/JobsTable";
import Loader from "@/components/Loader";
import { useFetchJobs } from "@/features/jobs-display/hooks/useFetchJobs";
import GmailFetcher from "@/components/FetchMails";
import SignInButton from "@/components/SingIn";

export default function Home() {
  const { jobs, isLoading } = useFetchJobs();

  if(isLoading){
    return <Loader />
  }

  return (
    <main className="w-full h-screen flex justify-center items-start overflow-auto">
      <div className="w-5xl p-3 grid place-items-center gap-5 mt-10">
        <div className="flex items-center gap-2">
          <GmailFetcher />
          <SignInButton />
        </div>
        <JobsTable  jobs={jobs ?? []} />
      </div>
    </main>
  );
}
