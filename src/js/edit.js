import { initializeEditPage, generateLastEditedMessage } from './views'
import { updateNote, removeNote, updateNotes } from './notes'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeNoteElement = document.querySelector('#remove-note')
const lastEdited = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElement.addEventListener('input', e => {
  const note = updateNote(noteId, {
    title: e.target.value
  })
  lastEdited.textContent = generateLastEditedMessage(note.updatedAt)
})

bodyElement.addEventListener('input', e => {
  const note = updateNote(noteId, {
    body: e.target.value
  })
  lastEdited.textContent = generateLastEditedMessage(note.updatedAt)
})

removeNoteElement.addEventListener('click', e => {
  removeNote(noteId)
  location.assign('./index.html')
})

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    updateNotes(e.newValue)
    initializeEditPage(noteId)
  }
})