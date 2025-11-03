import { Job } from "@prisma/client";
import { useState, useEffect } from "react";
import { fetchJobs } from "../services/jobs-display-service";

export function useFetchJobs(){
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function handleFetchJobs(){
          try{
            setIsLoading(true);
            const data = await fetchJobs();
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
    
        handleFetchJobs();
      }, []);

    return {
        jobs,
        isLoading
    }
}