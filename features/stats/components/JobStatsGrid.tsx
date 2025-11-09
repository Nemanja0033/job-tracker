import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { FileText, Mic, X, CalendarCheck } from 'lucide-react'
import { StatsData } from '../types'

const JobStatsGrid = ({ data }: { data: StatsData | undefined }) => {
  return (
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
  )
}

export default JobStatsGrid