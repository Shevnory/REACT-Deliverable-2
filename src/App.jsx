import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [climate, setClimate] = useState({});
  


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=1701ae73000bf65c518fed3bca0e195b`)
        .then(res => setClimate(res.data))
    }
  }, [])

  const temperatureK = climate.main?.temp;
  const temperatureC = Math.round(temperatureK - 273.15);
  const temperatureF = Math.round((temperatureC * 1.8) + 32);

  const [ temperature, setTemperature] = useState(climate.main?.temp);

  console.log(temperature);

  const changeTemperature = () => {
    if(temperature === `${temperatureC} C°`){
      setTemperature(`${temperatureF} F° `)
    }else{
      setTemperature(`${temperatureC} C°`)
    }
  }


  return (
    <div className="App">
      <div className='climate' >
          <div className="icon">
              <img className='climate-icon' src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}.png`} alt="" />
          </div>

          <h3>
            Your city is: {climate.name} in {climate.sys?.country}
          </h3>
          <h3>
            <i className="fa-solid fa-temperature-low"></i> Temperature : {temperature}
            {
              temperature === undefined && ( `${temperatureC} C°` )
            }
          </h3>
          <h4>
            <i className="fa-solid fa-cloud-sun"></i> cloudiness: {climate.weather?.[0].description}
          </h4>
          <h4>
            <i className="fa-solid fa-cloud"></i> Clouds: {climate.clouds?.all} %
          </h4>
          <h4>
            <i className="fa-solid fa-wind"></i> Wind speed: {climate.wind?.speed} m/s
          </h4>
          <button onClick={changeTemperature} > C° / F° </button>
      </div>

    </div>
  )
}

export default App
