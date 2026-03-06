import { addMember } from "./post/memberPost";
import { addAssignment } from "./post/assignmentsPost";
import { getMembers } from "./api/getMembers";
import { getAssignments } from "./components/renderAssignments";

const form = document.querySelector('#memberForm') as HTMLFormElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const member = {
    name: formData.get('name') as string,
    category: formData.get('category') as string
  };

  const result = await addMember(member);
  console.log(result);
  await getMembers()
});


const formAssignment = document.querySelector('#assignmentForm') as HTMLFormElement

formAssignment.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(formAssignment)

    const assignment = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string
    }
    const result = await addAssignment(assignment)
    console.log(result);
    await getAssignments()
})





// startConvo();


// const AIform = document.querySelector('#aiForm') as HTMLFormElement;
// AIform.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const inputText = AIform.querySelector('input')?.value;
//     if (!inputText) return;

//     conversation.push({user: inputText});

//     const prompt = getPrompt(conversation);
//     const reply = await getGeminiAnswer(prompt);
//     if (reply) conversation.push({gemini: reply});

//     renderConversation(conversation);
// }); 