import { StatsData } from '../types'
import { Card } from '@/components/ui/card'
import { Bar } from 'react-chartjs-2'
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const JobChart = ({ data }: { data: StatsData | undefined }) => {
  return (
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
  )
}

export default JobChart