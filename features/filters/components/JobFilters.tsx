import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filters } from "../types";

export default function JobFilters({ status,searchTerm, isDisabled, handleSearch, showApplied, showRejected, showInterview, reset }: Filters){
    return (
      <div className="md:flex w-full items-center grid gap-2">
          <Input disabled={isDisabled} value={searchTerm} onChange={handleSearch} className="md:w-60 w-full h-10 border px-3" placeholder="Search by name. . ." />
          <Button disabled={isDisabled} type="button" variant={'outline'} onClick={showApplied} size={'sm'}>Show Applied</Button>
          <Button disabled={isDisabled}  type="button" variant={'outline'} onClick={showRejected} size={'sm'} >Show Rejected</Button>
          <Button disabled={isDisabled}  type="button" variant={'outline'} onClick={showInterview} size={'sm'} >Show Interview</Button>
          {(status || searchTerm) && <Button disabled={isDisabled} type="button" size={'sm'} onClick={reset}>Reset Filters</Button>}
        </div>
    )
  }