//Aside section
const input = document.querySelector('.input');
const noteList = document.querySelector('.note-list');
const addBtn = document.querySelector('.add-buttom');

//Main section 
const titleNotes = document.querySelector('.title-notes');
const pinBtn = document.querySelector('.pin-btn');
const textArea = document.querySelector('.textarea');

//delete button section
const btnDelete = document.querySelector('.Delete');

//remove and cancel button
const cancelBtn = document.querySelector('.Cancel');
const removeBtn = document.querySelector('.remove-btn');


//save notes

let notes = JSON.parse(localStorage.getItem('notes') || "[]");
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

const div = document.createELement("div");
div.className = "note-item" + (note.id === currentId ? " active" : "");
div.onclick = () => selectNote(id);
div.innerHTML = `

<h1>${note.title}</h1>
<small>${note.date}</small>
${note.pinned ? `<span class="icon-pin">iconPin</span>` : ''}

`;



}


}