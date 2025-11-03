export async function fetchJobs(){
    try{
        const res = await fetch('/api/jobs');
        const data = await res.json();
        return data
    }
    catch(err){
        console.error(err);
        throw new Error("Error while fetching jobs");
    }
}