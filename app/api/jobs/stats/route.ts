import { db } from "@/lib/db";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if(!start || !end){
        return NextResponse.json({ error: "Missing date range" }, { status: 400 });
    }

    try{
        const jobs = await db.job.findMany({
            where: {
                appliedAt: {
                    gte: new Date(start),
                    lte: new Date(end)
                }
            },
            orderBy: {
                appliedAt: 'asc'
            }
        });

        const allAppliedDates = [jobs[0].appliedAt];

        // iterate through jobs and take one date for one day
        for (let i = 1; i < jobs.length; i++) {
            if (jobs[i].appliedAt.toISOString().split('T')[0] !== jobs[i - 1].appliedAt.toISOString().split('T')[0]) {
                allAppliedDates.push(jobs[i].appliedAt);
            }
        }

        // Data that will be send to client 
        //  1. Total Applies amount
        //  2. Total Rejected amount
        //  3. Total Interviews amount 
        //  4. All applying days (dates)
        //  5. Average applies per day
        //  6. Number of applies on each day
        
        const totalApplies = jobs.length;
        const totalRejected = jobs.filter((job) => job.status === "REJECTED")
        const totalInterviews = jobs.filter((job) => job.status === "INTERVIEW");
        const totalApplyingDays = allAppliedDates;
        const averageAppliesPerDay = Math.floor(totalApplies / allAppliedDates.length);

        // Calculate the amount of applies for each applying day.
        const appliesPerDay: Record<string, number> = {};
        for(let i = 0; i < totalApplyingDays.length; i++){
            const jobsAppliedOnSameDate = jobs.filter((job) => job.appliedAt.toISOString().split('T')[0] === totalApplyingDays[i].toISOString().split('T')[0])
            appliesPerDay[format(totalApplyingDays[i], 'yyyy-MM-dd')] = jobsAppliedOnSameDate.length;
        }
        

        return NextResponse.json({ totalApplies, totalInterviews, totalRejected, appliesPerDay, averageAppliesPerDay }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ error: err }, { status: 500 });
    }
}