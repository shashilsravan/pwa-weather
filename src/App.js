import { useState } from 'react';
// importing fetchData method from api
import fetchData from './api/fetchData';
// importing styles
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [type, setType] = useState(null)

  const search = async (e) => {
    if(e.key === 'Enter'){
      const data = await fetchData(query)
      console.log('data :>> ', data);
      if (data.weather[0].description === 'overcast clouds'){
        setType('overcast')
      }
      else if (data.weather[0].description === 'haze'){
        setType('haze')
      }
      else if (data.weather[0].description.includes('rain')){
        setType('rain')
      }
      else if (data.weather[0].description === 'clear sky'){
        setType('clear')
      }
      else if (data.weather[0].description.includes('clouds')){
        setType('cloudy')
      }
      else{
        setType(null)
      }
      setWeather(data);
      setQuery("")
    }
  }
  return (
    <div className={type ? `main-container ${type}` : 'main-container'}>
        <input type="text" className='search' placeholder='Search City'
          onKeyPress={search} 
          value={query} onChange={(e) => setQuery(e.target.value)} />
        
        {weather.main && (
          <div className='city'>
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg; C</sup>
            </div>
            <div className="info">
              <p>Humidity: {weather.main.humidity}%</p>
              <img className="city-icon" 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description} />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
