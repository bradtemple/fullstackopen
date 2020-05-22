import React from 'react'

const Persons = ({ removeName, personsToShow }) => (
  <ul>
    {personsToShow.map(person => (<li key={person.id}>{person.name}: {person.number} 
      <button onClick={() => {window.confirm(`Delete ${person.name}?`) ? removeName(person.id) : console.log(`${person.name} not deleted`)}}>delete</button></li>))}
  </ul>
)

export default Persons