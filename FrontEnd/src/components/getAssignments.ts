const url = 'http://localhost:3013'


export async function getAssignments() {
    const response = await fetch(url + '/assignments')
     if(!response.ok) {throw new Error(response.statusText)}
     const assignments = await response.json() 

      const responseMember = await fetch(url + '/members')
      if(!responseMember.ok) {throw new Error(responseMember.statusText)}
      const users = await responseMember.json()
  

        const columnInprogress = document.querySelector('#board-todo') as HTMLDivElement
         columnInprogress.innerHTML = '';
    

        assignments.forEach((assignment: {title:string, description:string, category:string,
        timestamp:string, status:string, assigendto:string }) => {

         const startedTask = document.createElement('div') 
         startedTask.id = 'startedTask'
         startedTask.className = 'column-todo'

        const memberSelect = document.createElement('select')
         
        const defualtOption = document.createElement('option')
        defualtOption.value = ''
       defualtOption.textContent = 'Choose a member'
       memberSelect.appendChild(defualtOption)
       
       users.forEach((user: {name:string, category:string}) => {
        const option = document.createElement('option')
        option.value = user.name
        option.textContent = user.name + ' (' + user.category + ')'
        memberSelect.appendChild(option)
    })
        
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
       


        columnInprogress.appendChild(startedTask);
      
     })
}

getAssignments()
