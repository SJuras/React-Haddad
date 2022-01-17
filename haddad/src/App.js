import React, { useState } from 'react';
import Logo from './assets/logo.png';
const api = {
  key: "d805e2532b2a8600a3c6b06901652955",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="title">
          <div className="title-picture">
            <img src={Logo} width="40" alt="haddad logo" />
          </div>
          <h2 className="title-text">HADDAD</h2>
        </div>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="default-box">
            <h3>Enter a name of a: <br />city <br />state <br />country<br /> or a continent<br /> to get the current average temperature</h3>
          </div>
        </div>
      )}
        <div className="footer">
          <p>Created by: Sarif-Design 2021.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
