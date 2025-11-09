
const StatsNav = ({ range, onChange }: { range: any, onChange: (e: any) => void }) => {
  return (
    <section className='flex w-full justify-between'>
        <h1 className='text-2xl font-medium'>Statistics</h1>
            <div className='flex gap-2 items-center'>
                <span className='text-sm'>*Filter</span>
                <select
                    className="border-2 rounded-md px-3 py-2"
                    value={range}
                    onChange={onChange}
                    >
                    <option value="3d">Last 3 days</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                </select>
            </div>
    </section>
  )
}

export default StatsNav