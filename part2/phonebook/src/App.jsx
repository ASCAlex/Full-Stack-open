import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addEntry = (event) => {
        event.preventDefault()
        const phonebookEntry = {
            name: newName
        }
        setPersons(persons.concat(phonebookEntry))
        setNewName('')
        console.log('button clicked', event.target)
    }

    const handleEntryChange = (event) => {
        setNewName(event.target.value)
    }

    const Number = ({person}) => {
        return (
            <>{person.name}<br/></>
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addEntry}>
                <div>
                    name: <input value={newName} onChange={handleEntryChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <p>
                {persons.map(person =>
                    <Number key={person.name} person={person} />
                )}
            </p>
        </div>
    )
}

export default App