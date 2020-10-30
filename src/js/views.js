import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM = note => {
  const noteEl = document.createElement('a')
  const textEl = document.createElement('p')
  const statusEl = document.createElement('p')

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title
  } else {
    textEl.textContent = 'Unnamed Note'
  }
  textEl.classList.add('list-item__title')
  noteEl.appendChild(textEl)

  // Setup the status message
  statusEl.textContent = generateLastEditedMessage(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  noteEl.appendChild(statusEl)

  // Setup the link
  noteEl.setAttribute('href', `./edit.html#${note.id}`)
  noteEl.classList.add('list-item')

  return noteEl
}

// Render application notes
const renderNotes = () => {
  const notesEl = document.querySelector('#notes')
  notesEl.innerHTML = ''

  const filters = getFilters()
  const notes = sortNotes(filters.sortBy)

  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(note => {
      notesEl.appendChild(generateNoteDOM(note))
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No notes to show'
    emptyMessage.classList.add('empty-message')
    notesEl.appendChild(emptyMessage)
  }
}

// Initialize edit page
const initializeEditPage = noteId => {
  const titleElement = document.querySelector('#note-title')
  const bodyElement = document.querySelector('#note-body')
  const lastEdited = document.querySelector('#last-edited')  
  const notes = getNotes()
  const note = notes.find(note => note.id === noteId)
  
  if (!note) {
    location.assign('./index.html')
  }
  
  titleElement.value = note.title
  bodyElement.value = note.body
  lastEdited.textContent = generateLastEditedMessage(note.updatedAt)
}

// Generate the last edited message
const generateLastEditedMessage = timestamp => `Last edited ${moment(timestamp).fromNow()}`

export { generateNoteDOM, renderNotes, generateLastEditedMessage, initializeEditPage }