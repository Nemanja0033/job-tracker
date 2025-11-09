export async function fetchStats(startDate: string, endDate: string) {
    const res = await fetch(`/api/jobs/stats?start=${startDate}&end=${endDate}`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  }
  