import React, { useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, apikey, weather, setWeather }) => {
  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apikey}&query=${country.name}`)
      .then(res => {
        const weatherData = res.data.current
        setWeather(weatherData)
        console.log(weatherData)
        console.log(weather)
        
        
      }) 
  }, [])
  return (
    <div>
      <h1>{country.name}</h1>

      capital {country.capital}<br/>
      population {country.population}<br/>

      <h3>Spoken languages</h3> 
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>

      <img src={country.flag} alt="flag" width="200"></img>
    
      <h3>Weather in {country.name}</h3>
      <strong>temperature:</strong>

      <strong>wind:</strong>
    </div>
  )
}

export default Country