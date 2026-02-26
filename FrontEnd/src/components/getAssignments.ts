import { patchAssignment } from "./patchAssignments";
const url = 'http://localhost:3013'
export async function getAssignments() {

    const columnTodo = document.querySelector('#board-todo') as HTMLDivElement
    const columnInprogress = document.querySelector('#board-in-progress') as HTMLDivElement
    
    columnTodo.innerHTML = '';
//<!----------------------------------------------------------------------------------------------------!/>
    const response = await fetch(url + '/assignments')
     if(!response.ok) {throw new Error(response.statusText)}
     const assignments = await response.json() 
//<!----------------------------------------------------------------------------------------------------!/>
      const responseMember = await fetch(url + '/members')
      if(!responseMember.ok) {throw new Error(responseMember.statusText)}
      const users = await responseMember.json()
  //<!----------------------------------------------------------------------------------------------------!/>
        assignments.forEach((assignment: {id: string, title:string, description:string, category:string,
        timestamp:string, status:string, assigendto:string }) => {
 //<!----------------------------------------------------------------------------------------------------!/>
         const startedTask = document.createElement('div') 
         startedTask.id = 'startedTask'
         startedTask.className = assignment.status
//<!----------------------------------------------------------------------------------------------------!/>
        const memberSelect = document.createElement('select')
        const defualtOption = document.createElement('option')
        defualtOption.value = ''
        defualtOption.textContent = 'Unassigned'
        memberSelect.appendChild(defualtOption)
//<!----------------------------------------------------------------------------------------------------!/>
       users.forEach((user: {name:string, category:string}) => {
        const option = document.createElement('option')
        option.value = user.name
        option.textContent = user.name + ' (' + user.category + ')'
        memberSelect.appendChild(option)
      })
 //<!----------------------------------------------------------------------------------------------------!/> 
      memberSelect.dataset.id = assignment.id
      memberSelect.value = assignment.assigendto

      memberSelect.addEventListener('change', async (event) => {
      event.preventDefault()
      const target = event.target as HTMLSelectElement
      const id = target.dataset.id
      const newAssignedTo = target.value
      const status = assignment.status
      if (!id) return 

      try {
       await patchAssignment(id, newAssignedTo, status)
       console.log(assignment)
       if(newAssignedTo){
        console.log(newAssignedTo, 'working')
        columnInprogress.appendChild(startedTask)
        // startedTask.classList.remove('box-todo')
        // startedTask.classList.add('box-in-progress')
        assigendto.innerText = newAssignedTo
        target.remove()
       }
      console.log('Updated good!')
      } catch(error){
      console.error("Updated failed", error)
    }
})
 //<!----------------------------------------------------------------------------------------------------!/>

        const title = document.createElement('h2')
        const description = document.createElement('p')
        const category = document.createElement('p')
        const timestamp = document.createElement('h2')
        const status = document.createElement('p')
        const assigendto = document.createElement('p')

        title.innerText = assignment.title
        description.innerText = assignment.description
        category.innerText = assignment.category
        timestamp.innerText = assignment.timestamp
        status.innerHTML = assignment.status
        assigendto.innerHTML = assignment.assigendto

        startedTask.appendChild(timestamp)
        startedTask.appendChild(title)
        startedTask.appendChild(description)
        startedTask.appendChild(category)
    
        startedTask.appendChild(status)
        startedTask.appendChild(assigendto)
        startedTask.appendChild(memberSelect)
       
        columnTodo.appendChild(startedTask);
      
     })
}

getAssignments()
