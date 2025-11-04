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
import { useEffect, useRef, useState } from "react"
import JobFilters from "@/features/filters/components/JobFilters"
import { Job } from "../types"
import { Button } from "@/components/ui/button"
import { Building2, Mic, Save, Trash, X } from "lucide-react"
import { useFilters } from "@/features/filters/hooks/useFilters"
import { updateRecordsStatus } from "@/features/batch-actions/services/batch-actions-service"

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const { jobsToDisplay, isStatusChanged, query, status, setQuery, setStatus, setIsStatusChanged } = useFilters(jobs);
  const updateFormRef = useRef<HTMLFormElement | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);


  const checkAllRows = (e: any, jobs: Job[]) => {
    if (e.target.checked) {
      setSelectedRows(jobs.map((j) => j.id));
    } else {
      setSelectedRows([]);
    }
  }

  const checkSingleRow = (e: any, id: string) => {
    if (e.target.checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  if(jobs.length < 1){
    return(
      <div className="w-full h-full flex justify-center">
          <span className="text-gray-400">Start importing jobs.</span>
      </div>
    )
  }

  return (
        <form ref={updateFormRef} className="w-full" action={bulkUpdateJobStatuses}>
            <div className="md:flex items-center grid w-full justify-between">
              <JobFilters status={status} searchTerm={query} isDisabled={isStatusChanged} handleSearch={(e) => setQuery(e.target.value)} reset={() => {setStatus(""); setQuery("")}} showApplied={() => setStatus("APPLIED")} showInterview={() => setStatus("INTERVIEW")}  showRejected={() => setStatus("REJECTED")}/>
              {isStatusChanged && (
                <div className="flex gap-2">
                  <Button type="button" onClick={() => {updateFormRef.current?.reset(); setIsStatusChanged(false)}} size={'sm'}><X />Cancel</Button>
                  <Button size={'sm'} className="bg-green-500 hover:bg-green-600"><Save />Save Changes</Button>
                </div>
              )}
            </div>
            {selectedRows.length > 0 && (
              <div className="w-full mt-3 flex items-center justify-between">
                <span className="font-medium">Selected Records ({selectedRows.length})</span>
                <div className="flex gap-2 items-center">
                  <Button onClick={async () => await updateRecordsStatus(selectedRows, "INTERVIEW") } variant={'outline'}><Mic />Mark As Interview</Button>
                  <Button variant={'outline'} size={'sm'}><X />Mark As Rejected</Button>
                  <Button variant={'destructive'} size={'sm'}><Trash />Delete {selectedRows.length} records</Button>
                </div>
              </div>
            )}
            <Table className="mt-5 border">
            <TableCaption>A list of your recent job applications.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead><input checked={selectedRows.length === jobs.length} onChange={(e) => checkAllRows(e, jobs)} type="checkbox" /></TableHead>
                <TableHead className="w-[100px] flex items-center gap-2"><Building2 size={20} strokeWidth={1} />Company</TableHead>
                <TableHead>Applied At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobsToDisplay.map((job) => (
                <TableRow key={job.id}>
                  <TableCell><input value={job.id} checked={selectedRows.includes(job.id)} onChange={(e) => checkSingleRow(e, job.id)} type="checkbox"  /></TableCell>
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
