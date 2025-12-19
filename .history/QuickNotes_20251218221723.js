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

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}