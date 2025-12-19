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
  saveNotes();
  console.log('working')
}