import { createNote, updateNotes } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'

renderNotes()

document.querySelector('#search-text').addEventListener('input', e => {
  setFilters({
    searchText: e.target.value
  })
  renderNotes()
})

document.querySelector('#sort-notes').addEventListener('change', e => {
  setFilters({
    sortBy: e.target.value
  })
  renderNotes()
})

document.querySelector('#create-note').addEventListener('click', e => {
  const id = createNote()
  location.assign(`./edit.html#${id}`)
})

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    updateNotes(e.newValue)
    renderNotes()
  }
})