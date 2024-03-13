import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addEntry = (event) => {
        event.preventDefault()
        const phonebookEntry = { name: newName, number: newNumber}
        const checkEqual = persons.some((person) => person.name === phonebookEntry.name)
        if (checkEqual) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(phonebookEntry))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const Person = ({person}) => {
        return (
            <>{person.name} {person.number}<br/></>
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with <input value={newFilter} onChange={handleFilterChange}/>
            <h2>add a new</h2>
            <form onSubmit={addEntry}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <p>
                {persons.filter(person =>
                    person.name.toLowerCase().includes(newFilter.toLowerCase().trim())
                ).map(person =>
                    <Person key={person.name} person={person} />
                )}
            </p>
        </div>
    )
}

export default App