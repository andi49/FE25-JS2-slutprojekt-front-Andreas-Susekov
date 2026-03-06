import { deleteAssignment } from "../api/deleteAssignemnts";
import { patchAssignment } from "../api/patchAssignments";
import { fetchAssigment, fetchMembers } from "../api/api";
import Sortable from "sortablejs";

export async function getAssignments() {

    const boardTodo = document.querySelector('#board-todo') as HTMLDivElement
    const boardInProgress = document.querySelector('#board-in-progress') as HTMLDivElement
    const boardIsDone = document.querySelector('#board-is-done') as HTMLDivElement
    boardTodo.innerHTML = ''
    boardInProgress.innerHTML = ''
    boardIsDone.innerHTML = ''
//<!----------------------------------------------------------------------------------------------------!/>
        const assignments = await fetchAssigment()
        const users = await fetchMembers()
  //<!----------------------------------------------------------------------------------------------------!/>
        assignments.forEach((assignment: {id: string, title:string, description:string, category:string,
        timestamp:string, status:string, assigendto:string }) => {
 //<!----------------------------------------------------------------------------------------------------!/>
         const startedTask = document.createElement('div') 
         startedTask.className = 'box-todo'
         startedTask.id = assignment.id
//<!----------------------------------------------------------------------------------------------------!/>
        const memberSelect = document.createElement('select')
        const defualtOption = document.createElement('option')
        defualtOption.value = ''
        defualtOption.textContent = 'Unassigned'
        memberSelect.appendChild(defualtOption)
//<!----------------------------------------------------------------------------------------------------!/>
        const nameInput = document.querySelector('#nameInput') as HTMLInputElement
        const categorySelect = document.querySelector('#categorySelect') as HTMLSelectElement
        nameInput.value = ''
        categorySelect.selectedIndex = 0
//<!----------------------------------------------------------------------------------------------------!/>
        users.filter((user: { category: string; }) => user.category === assignment.category)
         .forEach((user: {name:string, category:string}) => {
        const option = document.createElement('option')
        option.value = user.name
        option.textContent = user.name + ' (' + user.category + ')'
        memberSelect.appendChild(option)
      })
 //<!----------------------------------------------------------------------------------------------------!/> 
      memberSelect.dataset.id = assignment.id
      memberSelect.value = assignment.assigendto

      memberSelect.addEventListener('change', async (event) => {
      
      const target = event.target as HTMLSelectElement
      const id = target.dataset.id
      const newAssignedTo = target.value
     
      if (id) {
        try {
      
       if(newAssignedTo)
        {
        await patchAssignment(id, newAssignedTo, "progress")
        getAssignments()
        }
        console.log('UPDATE OK!', newAssignedTo)
      } catch(error){
      console.error("Updated failed", error)
    }
      }  else {
         throw new Error('Assignment is missing and ID and cant update it')
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
//<!----------------------------------------------------------------------------------------------------!/>
console.log(assignment.id)  

Sortable.create(boardIsDone, {
    group: 'tasks',
    animation: 150,
    onSort: function (taskBox) { 
        // taskBox.item to accses the dragble item like an event listner // ta bort sen innan push 
          const id = taskBox.item.id;
         console.log(taskBox.item.id)
        patchAssignment(id, assignment.assigendto, "progress");
        
        // renderProgress();
    }
});

Sortable.create(boardInProgress, {
    group: 'tasks',
    animation: 150,
    onSort: function (taskBox) { 
       const id = taskBox.item.id;
        patchAssignment(id, assignment.assigendto, "done");
        // renderDone();
    }
});

         const doneButton = document.createElement('button')
       doneButton.innerText = 'Done'
       const deleteButton = document.createElement('button')
      deleteButton.innerText = 'Delete'
     const moveButton = document.createElement('button')
    moveButton.innerText = 'Move'

            
function renderTodo() {
    startedTask.title = title.innerText;
    startedTask.className = 'box-todo'; 
    status.style.color = "#FFB33F";
    boardTodo.appendChild(startedTask);
}

function renderProgress() {
    startedTask.className = 'box-in-progress';
    status.style.color = "green";
    boardInProgress.appendChild(startedTask);
    memberSelect.remove();
    startedTask.appendChild(doneButton);

    doneButton.addEventListener('click', async () => {
        try {
            await patchAssignment(assignment.id, assignment.assigendto, "done");
            assignment.status = 'done';
            renderDone();
            doneButton.remove()
        } catch (error) {
            console.log(error);
        }
    });

    moveButton.addEventListener('click', async () => {
        try {
            await patchAssignment(assignment.id, assignment.assigendto, "progress");
            assignment.status = 'progress';
            renderProgress();
        } catch (error) {
            console.log(error);
        }
    });

    deleteButton.addEventListener('click', async () => {
        await deleteAssignment(assignment.id);
        startedTask.remove();
    });
}

function renderDone() {
    startedTask.className = 'box-is-done';
    status.style.color = "#C00707";
    status.innerText = 'DONE';
    boardIsDone.appendChild(startedTask);

 
    startedTask.appendChild(deleteButton);
    startedTask.appendChild(moveButton);

    memberSelect.remove();

    moveButton.addEventListener('click', async () => {
        try {
            await patchAssignment(assignment.id, assignment.assigendto, "progress");
            assignment.status = 'progress';
            status.innerHTML = 'progress'
            moveButton.remove()
            deleteButton.remove()
           renderProgress()
        } catch (error) {
            console.log(error);
        }
    });

    deleteButton.addEventListener('click', async () => {
        await deleteAssignment(assignment.id);
        startedTask.remove();
    });
}

  

        if(assignment.status === 'new') {
            renderTodo()
        } else if(assignment.status === "progress") {
            renderProgress()
        } else if(assignment.status === "done") {
            renderDone()
        }
     })

     
}



getAssignments()