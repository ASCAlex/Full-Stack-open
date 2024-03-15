import { useState, useEffect } from 'react'
import axios from "axios";
import personService from './services/persons.js'

const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <>
            filter shown with <input value={newFilter} onChange={handleFilterChange}/>
        </>
    )
}

const PersonForm = ({addEntry, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return(
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
    )
}

const Persons = ({persons, newFilter, Person}) => {
    return (
        <p>
            {persons.filter(person =>
                person.name.toLowerCase().includes(newFilter.toLowerCase().trim())
            ).map(person =>
                <Person key={person.name} person={person} />
            )}
        </p>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        personService.getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const addEntry = (event) => {
        event.preventDefault()
        const phonebookEntry = { name: newName, number: newNumber}
        const checkEqual = persons.some((person) => person.name === phonebookEntry.name)
        if (checkEqual) {
                alert(`${newName} is already added to phonebook`)
        } else {
            personService.create(phonebookEntry)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
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

            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

            <h3>add a new</h3>

            <PersonForm addEntry={addEntry} newName={newName} newNumber={newNumber}
                        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons persons={persons} newFilter={newFilter} Person={Person}/>
        </div>
    )
}

export default App