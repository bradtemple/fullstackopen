import React, { useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, apikey, weather, setWeather }) => {

  useEffect(() => {
    console.log('effect')
    const fetchWeather = () => {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${apikey}&query=${country.capital}`)
      .then(res => {
        const weatherData = res.data.current
        setWeather(weatherData)
        console.log(weatherData)
      })
    }
    fetchWeather()
  }, [])
  console.log(weather.current)
  
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
    
      <h3>Weather in {country.capital}</h3>
      <strong>temperature: {weather.temperature} C</strong><br/>
      <img src={weather.weather_icons} alt="weather" /><br/>
      <strong>wind: {weather.wind_speed} mph {weather.wind_dir}</strong>
    </div>
  )
}

export default Country