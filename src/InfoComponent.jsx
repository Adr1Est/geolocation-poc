import { useEffect, useState } from "react"
import Loader from "./Loader"
import Locate from "./Locate"
import { getWeather } from "./geolocation-service/weather-service"
import Weather from "./Weather"

function InfoComponent({ latitude, longitude, localization }){
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    const getWeatherFromAPI = async () => {
      const data = await getWeather(latitude, longitude)
      console.log(data)
      setWeatherInfo(data)
    }
    getWeatherFromAPI()
  }, [])

  return (
    <div className="flex flex-col gap-1 bg-amber-300 text-gray-950 rounded-3xl p-3">
      <p>Info de la API de geolocalización</p>
      <div className="flex justify-center items-center w-full">
        {localization ? <Locate localization={localization}/> : <Loader />}
      </div> 
      <div className="flex justify-center items-center w-full">
        {weatherInfo ? <Weather weatherInfo={weatherInfo}/> : <Loader />}
      </div> 
      <p>Latitud: {latitude}</p>
      <p>Longitud: {longitude}</p>
      <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" className="text-6xl text-center">🗺️</a>
    </div>
  )
}

export default InfoComponent