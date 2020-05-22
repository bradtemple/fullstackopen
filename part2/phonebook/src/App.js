import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = e => {
    setNewFilter(e.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const removeName = ({ name, id }) => {
    personService
      .remove(id)
      .then(() => {
        setMessage(
          `Removed ${name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const addName = e => {
    e.preventDefault()
    if(persons.some(person => person.name === newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(result) {
        const personId = persons.find(p => p.name === newName).id
        const updatedObject = {
          name: newName,
          number: newNumber
        }
        personService
          .update(personId, updatedObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personId ? p : returnedPerson))
            setMessage(
              `Updated ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} was already deleted from server`)            
            setPersons(persons.filter(p => p.id !== personId))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          
      }
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter 
        handleFilterChange={handleFilterChange} 
        newFilter={newFilter}        
      />
      <h3>add a new</h3>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        removeName={removeName}
      />   
    </div>
  )
}

export default App;
