import { getAssignments } from "./getAssignments";

const url  = 'http://localhost:3013'

export async function patchAssignment(id:string, assigendto:string, status:string) {
    try{
        const response = await fetch(url + `/assignments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ assigendto: assigendto, status:status }) 
    });
   if (!response.ok) {
      throw new Error('Failed to update assignment');
    }
    await getAssignments()
    return await response.json();
    
  } catch (error) {
    
    console.error(error);
    throw error;
  }
}

