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

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentId = null;


function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {

const query = input.value.toLowerCase();


const pinned = notes.filter(n => n.pinned);
const others = notes.filter(n => !n.pinned);

const filtered = [...pinned, ...others]
.filter(n => 
  n.title.toLowerCase().includes(query) || n.content.toLowerCase(query)
);


  for (let note of filtered) {

    const div = document.createElement("div");
    div.className = "note-item" + (note.id === currentId ? " active" : "");
    div.onclick = () => selectNote(note.id);
    div.innerHTML = `
    <h1>${note.title}</h1>
    <small>${note.date}</small>
      ${note.pinned ? '<span class="icon-pin">iconPin</span>' : ''}
    `;
    noteList.appendChild(div);

  }
};

function selectNote(id) {
  currentId = id;
  const note = notes.find(n => n.id === id);
  if (!note) return;
  titleNotes.value = note.title;
  textArea.value = note.content;
  edit.textContent = "Last edit: " + note.date;
  pinBtn.innerHTML = note.pinned ? "Unpin" : "Pin";
  renderNotes();
};

function currentUpdate() {
  const note = notes.find(n => n.id === currentId);
  if (!note) return;
  note.title = titleNotes.value;
  note.content = textArea.value;
  note.date = new Date().toLocaleString();
  edit.textContent = "Last edited: " + note.date;
  saveNotes();
  renderNotes();
}

function addNote() {
  const newNote = {
    id: Date.now(),
    title: "",
    content: "",
    date: new Date().toLocaleString(),
    pinned: false
  };
  notes.unshift(newNote);
  currentId = newNote.id;
  saveNotes();
  renderNotes();
  selectNote(newNote.id);
};



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
  edit.textContent = "Last edit: -";
  saveNotes();
  renderNotes();
  cancelModal();
}


function togglePin() {
 const note = notes.filter(n => n.id === currentId);
 if (!note) return;
 note.pinned = !note.pinned;
 pinBtn.innerText = note.pinned ? 'Unpin' : 'Pin'; 
 saveNotes();
 renderNotes();
}



renderNotes();