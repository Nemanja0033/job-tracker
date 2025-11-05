import { useState } from "react";
import { Job } from "../../jobs-display/types/index"
import { Email } from "@/features/mails/hooks/useFetchMails";

export function useFilters(data: Job[] |Email[], type: "JOBS" | "EMAIL"){
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const [isStatusChanged, setIsStatusChanged] = useState(false);
    let filteredData: any = [];

    if(type === 'JOBS'){
      filteredData = data.filter((job: any) => {
        const matchesQuery = query
            ? job.title.toLowerCase().includes(query.toLowerCase())
            : true;
        
          const matchesStatus = status
            ? job.status.toLowerCase() === status.toLowerCase()
            : true;
        
          return matchesQuery && matchesStatus;
      });
    }

    if(type === 'EMAIL'){
      filteredData = data.filter((email: any) => {
        const matchesQuery = query
            ? email.subject.toLowerCase().includes(query.toLowerCase()) || email.from.toLowerCase().includes(query.toLowerCase())
            : true;
        
          const matchesStatus = status
            ? email.subject.toLowerCase() === status.toLowerCase()
            : true;
        
          return matchesQuery && matchesStatus;
      });
    }

    return{
        query,
        status,
        isStatusChanged,
        filteredData,
        setQuery,
        setStatus,
        setIsStatusChanged
    }
}