import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data) 
      }) 
  }, [])

  const handleFilterChange = e => {
    setNewFilter(e.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  if(countriesToShow.length === 1) {
    const country = countriesToShow[0]
    return (
      <div className="App">
        find countries <input
          value={newFilter}
          onChange={handleFilterChange}
        />
        <Country country={country} 
                 apikey={api_key} 
                 weather={weather}
                 setWeather={setWeather}
        />
      </div>
    )
    
  } else {
    return (
      <div className="App">
        find countries <input
          value={newFilter}
          onChange={handleFilterChange}
        />
        <ul>
          {countriesToShow.length > 10 
            ? <li>Too many matches, specify another filter</li>
            : countriesToShow.map(country => 
                <li key={country.name}>{country.name} 
                  <button onClick={() => {setNewFilter(country.name)}}>show</button>
                </li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
