"use client"
import { formatISO, subDays } from 'date-fns'
import { useStats } from "@/features/stats/hooks/useStats"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar } from 'react-chartjs-2'
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Job } from '@/features/jobs-display/types'
import { CalendarCheck, ExternalLink, FileText, Mic, X } from 'lucide-react'
import Loader from '@/components/Loader'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const ranges = {
    "3d": 3,
    "7d": 7,
    "30d": 30,
    "90d": 90,
  } as const;

export interface StatsData {
    totalApplies: number;
    totalInterviews: Job[];
    totalRejected: Job[];
    appliesPerDay: any;
    averageAppliesPerDay: number
}

export default function StatsPage(){
    const [range, setRange] = useState<keyof typeof ranges>("7d")
    const endDate = formatISO(new Date(), { representation: "date" })
    const startDate = formatISO(subDays(new Date(), ranges[range]), { representation: "date" })
    const { data, isLoading, isError } = useStats(startDate, endDate);

    console.log(data);

    if(isLoading){
        return <Loader type='NORMAL' />
    }
   
    return(
        <main className="w-full h-full flex justify-center items-center">
            <section className="w-5xl p-3 grid place-items-center gap-5">
                <section className='flex w-full justify-between'>
                    <h1 className='text-2xl font-medium'>Statistics</h1>
                    <div className='flex gap-2 items-center'>
                        <span className='text-sm'>*Filter</span>
                        <select
                        className="border px-3 py-2 rounded"
                        value={range}
                        onChange={(e) => setRange(e.target.value as keyof typeof ranges)}
                        >
                            <option value="3d">Last 3 days</option>
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                        </select>
                    </div>
                </section>
                <Card className='w-full h-auto'>
                    <Bar data={{
                        labels: Object.keys(data?.appliesPerDay),
                        datasets: [
                            {
                                label: "Applications per day",
                                data: Object.values(data?.appliesPerDay),
                                backgroundColor: 'black'
                            },
                        ]
                    }}/>
                </Card>

                <section className='grid w-full grid-cols-2 gap-3'>
                    <Card className='gird place-items-center'>
                            <CardTitle className='flex items-center gap-2'><FileText strokeWidth={1} />Total Applies</CardTitle>
                        <CardContent>
                            <b className='text-xl'>{data?.totalApplies}</b>
                        </CardContent>
                    </Card>
                    <Card className='gird place-items-center'>
                            <CardTitle className='flex gap-2 items-center'><Mic strokeWidth={1} />Total Interviews</CardTitle>
                        <CardContent>
                            <b className='text-xl'>{data?.totalInterviews.length}</b>
                        </CardContent>
                    </Card>
                    <Card className='gird place-items-center'>
                            <CardTitle className='flex gap-2 items-center'><X strokeWidth={1} />Total Rejections</CardTitle>
                        <CardContent>
                            <b className='text-xl'>{data?.totalRejected.length}</b>
                        </CardContent>
                    </Card>
                    <Card className='gird place-items-center'>
                            <CardTitle className='flex gap-2 items-center'><CalendarCheck strokeWidth={1} />Average Applies</CardTitle>
                        <CardContent>
                            <b className='text-xl'>{data?.averageAppliesPerDay} / <span className='font-normal text-lg'>per day</span></b>
                        </CardContent>
                    </Card>
                </section>
            </section>
        </main>
    )
}