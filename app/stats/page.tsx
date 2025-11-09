"use client"
import { formatISO, subDays } from 'date-fns'
import { useStats } from "@/features/stats/hooks/useStats"
import { useState } from "react"
import Loader from '@/components/Loader'
import JobChart from '@/features/stats/components/JobChart'
import JobStatsGrid from '@/features/stats/components/JobStatsGrid'
import StatsNav from '@/features/stats/components/StatsNav'

const ranges = {
    "3d": 3,
    "7d": 7,
    "30d": 30,
    "90d": 90,
  } as const;

export default function StatsPage(){
    const [range, setRange] = useState<keyof typeof ranges>("7d")
    const endDate = formatISO(new Date(), { representation: "date" })
    const startDate = formatISO(subDays(new Date(), ranges[range]), { representation: "date" })
    const { data, isLoading } = useStats(startDate, endDate);

    if(isLoading){
        return <Loader type='NORMAL' />
    }
   
    return(
        <main className="w-full h-full flex justify-center items-center">
            <section className="w-5xl p-3 grid place-items-center gap-5">
                <StatsNav onChange={(e) => setRange(e.target.value as keyof typeof ranges)} range={range} />
                <JobChart data={data} />
               <JobStatsGrid data={data} />
            </section>
        </main>
    )
}