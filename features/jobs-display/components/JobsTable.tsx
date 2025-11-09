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
import { bulkUpdateJobStatuses } from "@/features/batch-actions/server-actions/formActions"
import { useEffect, useRef, useState } from "react"
import JobFilters from "@/features/filters/components/FiltersToolbars"
import { Job } from "../types"
import { Button } from "@/components/ui/button"
import { Building2, Mic, Save, Trash, X } from "lucide-react"
import { useFilters } from "@/features/filters/hooks/useFilters"
import { deleteRecords, updateRecordsStatus } from "@/features/batch-actions/services/batch-actions-service"
import { FileImportForm } from "@/features/jobs-import/components/ImportForm"
import ExportToPdf from "@/features/jobs-export/components/ExportToPdf"

export function JobsTable({ jobs, isLoading }: { jobs: Job[], isLoading: boolean }) {
  const { filteredData: jobsToDisplay, isStatusChanged, query, status, setQuery, setStatus, setIsStatusChanged } = useFilters(jobs, "JOBS");
  const updateFormRef = useRef<HTMLFormElement | null>(null);
  const tableRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isTableReady, setIsTableReady] = useState(false);

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

  useEffect(() => {
    if (tableRef.current) {
      setIsTableReady(true);
    }
  }, []);

  if(!isLoading && jobs.length < 1){
    return(
      <div className="w-full h-full flex justify-center">
          <span className="text-gray-400">Start importing jobs.</span>
      </div>
    )
  }

  return (
        <>
          <div className="flex w-full justify-between">
            {isTableReady && <ExportToPdf isDisabled={selectedRows.length > 0} tableRef={tableRef.current} />}
            <FileImportForm isDisabled={selectedRows.length > 0} />
          </div>
          <form ref={updateFormRef} className="w-full" action={bulkUpdateJobStatuses}>
          <div className="md:flex items-center grid w-full justify-between">
            <JobFilters filterType="JOBS" status={status} searchTerm={query} isDisabled={isStatusChanged} handleSearch={(e) => setQuery(e.target.value)} reset={() => { setStatus(""); setQuery("") } } showApplied={() => setStatus("APPLIED")} showInterview={() => setStatus("INTERVIEW")} showRejected={() => setStatus("REJECTED")} />
            {isStatusChanged && (
              <div className="flex gap-2">
                <Button type="button" onClick={() => { updateFormRef.current?.reset(); setIsStatusChanged(false) } } size={'sm'}><X />Cancel</Button>
                <Button size={'sm'} className="bg-green-500 hover:bg-green-600"><Save />Save Changes</Button>
              </div>
            )}
          </div>
          {selectedRows.length > 0 && (
            <div className="w-full mt-3 flex items-center justify-between">
              <span className="font-medium">Selected Records ({selectedRows.length})</span>
              <div className="flex gap-2 items-center">
                <Button type="button" onClick={async () => await updateRecordsStatus(selectedRows, "INTERVIEW")} variant={'outline'}><Mic />Mark As Interview</Button>
                <Button type="button" variant={'outline'} size={'sm'}><X />Mark As Rejected</Button>
                <Button type="button" onClick={async () => {await deleteRecords(selectedRows); location.reload();}} variant={'destructive'} size={'sm'}><Trash />Delete {selectedRows.length} records</Button>
              </div>
            </div>
          )}
          <Table ref={tableRef} className="mt-5 border">
            <TableCaption>A list of your recent job applications.</TableCaption>
            <TableHeader>
              <TableRow data-html2canvas-ignore>
                <TableHead><input data-html2canvas-ignore checked={selectedRows.length === jobs.length} onChange={(e) => checkAllRows(e, jobs)} type="checkbox" /></TableHead>
                <TableHead className="w-[100px] flex items-center gap-2"><Building2 size={20} strokeWidth={1} />Company</TableHead>
                <TableHead>Applied At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobsToDisplay.map((job: Job) => (
                <TableRow key={job.id}>
                  <TableCell><input data-html2canvas-ignore value={job.id} checked={selectedRows.includes(job.id)} onChange={(e) => checkSingleRow(e, job.id)} type="checkbox" /></TableCell>
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
            <TableFooter data-html2canvas-ignore>
              <TableRow>
                <TableCell colSpan={5}><span className="font-medium">Total {jobsToDisplay.length}</span></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </form>
      </>
  )
}
