"use client"
import { Job } from "@/app/page"
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
import { Button } from "./ui/button"
import { bulkUpdateJobStatuses } from "@/actions/formActions"
import { useState } from "react"
import { Input } from "./ui/input"

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  let jobsToDisplay: Job[] = jobs;

  if(query){
    jobsToDisplay = jobs.filter((job) => job.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  }

  if(status){
    jobsToDisplay = jobs.filter((job) => job.status.toLocaleLowerCase().includes(status.toLocaleLowerCase()));
  }

  if(jobs.length < 1){
    return(
      <div className="w-full h-full flex justify-center">
          <span className="text-gray-400">Start importing jobs.</span>
      </div>
    )
  }

  return (
        <form action={bulkUpdateJobStatuses}>
            <div className="flex gap-2 items-center">
              <Button  type="submit" variant={'outline'}>Save changes</Button>
            </div>
            <div className="mt-5 md:flex grid gap-2">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} className="md:w-60 w-full h-10 border px-3" placeholder="Search by name. . ." />
              <Button type="button" variant={'secondary'} onClick={() => setStatus("APPLIED")} size={'sm'}>Show Applied</Button>
              <Button className="text-red-500" type="button" variant={'secondary'} onClick={() => setStatus("REJECTED")} size={'sm'} >Show Rejected</Button>
              <Button className="text-green-500" type="button" variant={'secondary'} onClick={() => setStatus("INTERVIEW")} size={'sm'} >Show Interview</Button>
              <Button variant={'outline'} type="button" size={'sm'} onClick={() => {
                setQuery('');
                setStatus('')
              }}>Reset</Button>
            </div>
            <Table className="mt-5">
            <TableCaption>A list of your recent job applications.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Company</TableHead>
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
                    <select defaultValue={job.status} name={`status-${job.id}`}>
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
