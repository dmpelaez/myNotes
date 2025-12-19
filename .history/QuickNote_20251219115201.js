//Aside section
const input = document.querySelector('.input');
const noteList = document.querySelector('.note-list');
const addBtn = document.querySelector('.add-button');

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

let notes = JSON.parse(localStorage.getItem('notes') || "[]");
let currentId = null;

//save storage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
  const newNotes = {
    id: Date.now(),
    title: "",
    content: "",
    date: new Date().toLocaleString(),
    pinned: false
  };
  notes.unshift(newNotes);
  currentId = newNotes.id;
  selectNote(newNotes.id);
  saveNotes();
  renderNotes();
  console.log('working')
}


function renderNotes() {
  const query = input.value;
  noteList.innerHTML = '';

  const pinned = notes.filter(n => n.pinned);
  const others = notes.filter(n => !n.pinned);

  const filtered = [...pinned, ...others].filter(n => {
    n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
  });


  for (let note of filtered) {
    const div = document.createElement("div");
    div.className = "note-item" + (note.id === currentId ? " active" : "");
    div.onclick = () => selectNote(note.id);
    div.innerHTML = `
    <h1>${note.title || "Untitled"}</h1>
    <small>${note.date}</small>
    ${note.pinned ? '<span class="icon-pin">📌</span>' : ''}
    `;
    noteList.appendChild(div);
  };
 
  console.log('working')
}


function selectNote(id){
  currentId = id;
  const note = notes.find(n => n.id === id);
  if (!note) return;
  currentId = null;
  titleNotes.value = note.title;
  textArea.value = note.content;
  note.date = new Date().toLocaleString();
  edit.innerText = "Last edited: " + note.date;
  pinBtn.innerHTML = note.pinned ? "Unpin" : "Pin";
  console.log(note.id);
  renderNotes();
}




function currentUpdate() {
  const note = notes.find(n => n.id === currentId);
  if (!note) return;
  note.title =  titleNotes.value;
  note.content = textArea.value;
  note.date = new Date().toLocaleString();
  edit.innerText = "Last edited: " + note.date;
  saveNotes();
  renderNotes();
  console.log('working')
}

function showModal() {
  deleteConfirm.classList.add("active");
}

function cancelModal() {
  deleteConfirm.classList.remove("active");
}

function remove() {
  notes = notes.filter(n => n.id !== currentId);
  currentId = null;
  titleNotes.value = "";
  textArea.value = "";
  edit.innerText = "last edited: -";
  renderNotes();
  cancelModal();
  saveNotes();
}

function togglePin() {
  const note = notes.find(n => n.id === currentId)
  if (!note) return;
  note.pinned = !note.pinned;
  pinBtn.textContent = note.pinned ? "Unpin" : "Pin";
  renderNotes();
  saveStorage();
  console.log('working');
}


renderNotes();