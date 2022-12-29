
import { useState } from 'react'
import './App.css';
import * as ReactBootstrap from 'react-bootstrap'

const api = {
    key: "fa054f2f8a790f89d51561901abb7ebb",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    
    const [query,setQuery] = useState('');
    const [weather,setWeather] = useState({});
    const [ispending, setIspending] = useState(true);

    const search = evt  =>{
      if (evt.key ==="Enter"){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setWeather(result);
            setQuery('');
            setIspending(false);
        });  
      }  
    }

   
  

    const dateBuilder = (d) =>{
     let months = ["january", "february","march","april","may","june","july","august","september",
     "october","november","december"];
     
     let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
     
     let day = days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year = d.getFullYear();

     return `${day} ${date} ${month} ${year}`
    }

 return(
    <div className={(typeof weather.main !="undefined")?((weather.main.temp > 16) ? 'app warm' : 'app') :'app'}>
    <main>
      <div className="search-box">
          <input
          type="text"
          placeholder='search...'
          className='search-bar'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
          </div>

          
{(typeof weather.main != "undefined") ? (
  
      <div>
        {ispending && <ReactBootstrap.Spinner animation="border" />} 
       <div className='location-box'>
       <div className='location'>{weather.name},{weather.sys.country}</div>
       <div className='date'>{dateBuilder(new Date())}</div>  

     </div>
     <div className='weather-box'>
      <div className='temp'>{Math.round(weather.main.temp)}°c</div>
      <div className='weather'>{weather.weather[0].main}</div>   
     </div>
        </div>
    ) : ('')}
    </main>
    </div>
 );
}

export default App;