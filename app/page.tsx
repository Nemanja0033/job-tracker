"use client"
import { FileImportForm } from "@/components/FileImportButtons";
import { JobsTable } from "@/components/JobsTable";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export interface Job {
  id: string
  title: string,
  appliedAt: Date | any,
  status: string
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fecthJobs(){
      try{
        setIsLoading(true);
        const res = await fetch('/api/jobs');
        const data = await res.json();
        console.log("Fetched jobs:", data);
        setJobs(data.jobs);
      }
      catch(err){
        console.error("error while fetch", err);
        setJobs([]);
      }
      finally{
        setIsLoading(false);
      }
    }

    fecthJobs();
  }, []);    

  return (
    <div className="w-full h-screen flex justify-center overflow-hidden">
      <div className="w-5xl p-3 gap-2  overflow-auto">
        {isLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
                  <>
                    <FileImportForm />
                    <JobsTable jobs={jobs ?? []} />
                  </>          
        )}
      </div>
    </div>
  );
}
