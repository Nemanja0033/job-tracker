import axios from "axios";

export async function updateRecordsStatus(ids: string[], status: string){
    try{
        return axios.patch('/api/batch', { recordIds: ids, status })
    }
    catch(err){
        throw new Error("Error while updating records");
    }
}

export async function deleteRecords(ids: string[]){
    try{
        return axios.delete('/batch', { data: ids })
    }
    catch(err){
        throw new Error("Error while deleting records");
    }
}