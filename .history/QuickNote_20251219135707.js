
let notes = JSON.parse(localStorage.getItem('notes') || "[]");
let currentId = null;



//Aside section
const input = document.querySelector('.input');
const noteList = document.querySelector('.note-list');
const addBtn = document.querySelector('.add-button');
const deleteBtn = document.querySelector('.delete-button');

//Main section 
const titleNotes = document.querySelector('.title-notes');
const pinBtn = document.querySelector('.pin-btn');
const textArea = document.querySelector('.textarea');

//delete button section
const btnDelete = document.querySelector('.delete-btn');
const edit = document.querySelector('.edit');

//delete confirm
const deleteConfirm = document.querySelector('.delete-confirm');

//remove and cancel button
const cancelBtn = document.querySelector('.cancel-btn');
const removeBtn = document.querySelector('.remove-btn');


//save notes


//save storage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}


//Add note function
function addNote() {
  // I create an object
  const newNotes = {
    id: Date.now(),
    title: "",
    content: "",
    date: new Date().toLocaleString(),
    pinned: false
  };
  //and pushes it to array
  notes.unshift(newNotes);
  //and change the currentId value
  currentId = newNotes.id;
  //automatically goes to the selectNotes
  selectNote(newNotes.id);
  saveNotes();
  renderNotes();
  console.log('working')
}

//Render notes
//Updates for every changes
function renderNotes() {
  //look for the value search
  const query = input.value.toLowerCase();
  //empty the noteList for every update
  noteList.innerHTML = '';

  //I use filter to put pinned and others into two category
  const pinned = notes.filter(n => n.pinned);
  const others = notes.filter(n => !n.pinned);
  //I uses [..., ...] to combined them together into one array again
  //but in order where pinned is the first in array
  //and uses includes in the title and content to easily
  //find the specific journal
  const filtered = [...pinned, ...others].filter(n => 
    //There is two option for this with curly bracket or none
    //I used none so it doesn't need for a return
    n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
  );

  //I use for let ... of to loop through the
  //array of filtered as note
  for (let note of filtered) {
    //created a div element for every 
    //entry
    const div = document.createElement("div");
    //class name has two part if the 
    //note.id is equal to the currentId then active will show
    div.className = "note-item" + (note.id === currentId ? " active" : "");
    //whenever clicking the div... selectNote will activate
    div.onclick = () => selectNote(note.id);
    div.innerHTML = `
    <h1>${note.title || "Untitled"}</h1>
    <small>${note.date}</small>
    ${note.pinned ? '<span class="icon-pin">📌</span>' : ''}
    `;
    noteList.appendChild(div);
  
   
  };
 

}


//When we go the id in the filtered
function selectNote(id){
  //I use it to reassigned the value of currentId
  currentId = id;
  //to change the currentId to the selectNote
  //and used the find to look for the id that has
  //the same value as the selected note
  const note = notes.find(n => n.id === id);
  if (!note) return;
  //if it is true, then
  //I will have access to the value of
  //note title and content and reassigned
  //titleNotes and textArea
  titleNotes.value = note.title;
  textArea.value = note.content;
  edit.innerText = "Last edited: " + note.date;
  pinBtn.innerHTML = note.pinned ? "Unpin" : "Pin";

  renderNotes();
}



//currentUpdate changes when there is 
//interaction in the title and textarea element
function currentUpdate() {
  //Where I use the find for array to meet the 
  //condition
  const note = notes.find(n => n.id === currentId);
  if(!note) return;
  //then the note title and content will have values
  note.title =  titleNotes.value;
  note.content = textArea.value;
  note.date = new Date().toLocaleString();
  edit.innerText = "Last edited: " + note.date;
  renderNotes();
  saveNotes();

}

console.log("Current ID:", currentId);
console.log("Notes:", notes);




//Show the modal or delete and cancel button option
function showModal() {
  deleteConfirm.classList.add("active");
}
//cancel without deleting
function cancelModal() {
  deleteConfirm.classList.remove("active");
}
//Remove the content and title 
//with cancelmodal disappearing
function remove() {
  //I use filter to look for every array 
  //inside the notes where the condition
  // is !== of two ids and 
  //if it true then that certain array
  //will be remove
  notes = notes.filter(n => n.id !== currentId);
  currentId = null;
  titleNotes.value = "";
  textArea.value = "";
  edit.innerText = "last edited: -";
  renderNotes();
  cancelModal();
  saveNotes();
  console.log(notes);
}
//Toggle pin
function togglePin() {
  //Look find the certain array by selecting it first
  //and thus the currentId will change
  //and I look for the array if it matches
  const note = notes.find(n => n.id === currentId)
  if (!note) return;
  //If that's the case then 
  //the opposite of its default value(false)
  //will be reassigned to true since I used
  // ! operator
  note.pinned = !note.pinned;
  //if it's true then it will show the unpin
  pinBtn.textContent = note.pinned ? "Unpin" : "Pin";
  renderNotes();
  saveNotes();
  console.log('working');
  //changes
}
//Delete all option
function deleteAll() {
  //I remove all the saveStorage inside the
  //arrray of notes
 localStorage.removeItem("notes");
 //then reset it
 notes = [];
 //changes
 currentId = null;
 edit.textContent = 'Last eedited: -';
textArea.value = '';
titleNotes.value = '';
 renderNotes();
}
//display changes
renderNotes();