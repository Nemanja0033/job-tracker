"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getTextColor } from "@/helpers"
import { bulkUpdateJobStatuses } from "@/actions/formActions"
import { useRef, useState } from "react"
import JobFilters from "@/features/filters/components/JobFilters"
import { Job } from "../types"
import { Button } from "@/components/ui/button"
import { Building2, Save, X } from "lucide-react"

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const jobsToDisplay = jobs.filter((job) => {
    const matchesQuery = query
        ? job.title.toLowerCase().includes(query.toLowerCase())
        : true;
    
      const matchesStatus = status
        ? job.status.toLowerCase() === status.toLowerCase()
        : true;
    
      return matchesQuery && matchesStatus;
  });
  const updateFormRef = useRef<HTMLFormElement | null>(null);
  

  if(jobs.length < 1){
    return(
      <div className="w-full h-full flex justify-center">
          <span className="text-gray-400">Start importing jobs.</span>
      </div>
    )
  }

  return (
        <form ref={updateFormRef} className="w-full" action={bulkUpdateJobStatuses}>
            <div className="md:flex items-center grid w-full justify-between mt-10">
              <JobFilters status={status} searchTerm={query} isDisabled={isStatusChanged} handleSearch={(e) => setQuery(e.target.value)} reset={() => {setStatus(""); setQuery("")}} showApplied={() => setStatus("APPLIED")} showInterview={() => setStatus("INTERVIEW")}  showRejected={() => setStatus("REJECTED")}/>
              {isStatusChanged && (
                <div className="flex gap-2">
                  <Button type="button" onClick={() => {updateFormRef.current?.reset(); setIsStatusChanged(false)}} size={'sm'}><Save /><X />Cancel</Button>
                  <Button size={'sm'} className="bg-green-500 hover:bg-green-600"><Save />Save Changes</Button>
                </div>
              )}
            </div>
            <Table className="mt-5 border">
            <TableCaption>A list of your recent job applications.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] flex items-center gap-2"><Building2 size={20} strokeWidth={1} />Company</TableHead>
                <TableHead>Applied At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobsToDisplay.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="text-gray-600">{new Date(job.appliedAt).toLocaleDateString()}</TableCell>
                  <TableCell className={getTextColor(job.status)}>
                    <input type="hidden" name="ids" value={job.id} />
                    <select onChange={() => setIsStatusChanged(true)} className="cursor-pointer" defaultValue={job.status} name={`status-${job.id}`}>
                      <option value={job.status}>{job.status}</option>
                      {job.status === "APPLIED" ? (
                        <>
                        <option value="REJECTED">REJECTED</option>
                        <option value="INTERVIEW">INTERVIEW</option>
                        </>
                      ) : null}
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total {jobs.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </form>
  )
}
