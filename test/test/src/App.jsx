import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './Note'
import noteService from './services/notes.js'

const App = () => {
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }

        noteService.create(noteObject)
            .then(returnedNode => {
                setNotes(notes.concat(returnedNode))
                setNewNote('')
            })
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService.update(id, changedNote)
            .then(returnedNode => {
                setNotes(notes.map(n => n.id !== id ? n : returnedNode))
            })
            .catch( error => {
                setErrorMessage(
                    `note '${note.content}' was already deleted from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
        })
    }

    const Notification = ({ message }) => {
        if (message === null) {
            return null
        }

        return (
            <div className={'error'}>
                {message}
            </div>
        )
    }

    const Footer = () => {
        const footerStyle = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: 16
        }
        return (
            <div style={footerStyle}>
                <br />
                <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
            </div>
        )
    }

    if (!notes) return null

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="">save</button>
            </form>
            <Footer />
        </div>
    )
}

export default App