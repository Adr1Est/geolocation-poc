import { useEffect, useState } from 'react'
import './App.css'
import { getGeolocationStatus, getUserLocation } from './geolocation-service/geolocation-service'
import Loader from './Loader'
import InfoComponent from './InfoComponent'

function App() {
  const [geolocationStatus, setGeolocationStatus] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleClick = () => {
    getUserLocation(
      (coords) => {
        setCurrentLocation(coords)
        setErrorMsg(null)
      },
      (mensajeError) => {
        setErrorMsg(mensajeError)
      }
    )
  }

  const saveCoordsToLocalStorage = () =>{
    if(currentLocation){
      localStorage.setItem("userLatitude", currentLocation.latitud)
      localStorage.setItem("userLongitude", currentLocation.longitud)
      return
    }
    return
  }

  const getCoordsFromLocalStorage = () => {
    const latitudeFromLocalStorage = localStorage.getItem("userLatitude")
    const longitudeFromLocalStorage = localStorage.getItem("userLongitude")
    if(latitudeFromLocalStorage === null || longitudeFromLocalStorage === null){
      return
    }
    setCurrentLocation({"latitud": latitudeFromLocalStorage, "longitud": longitudeFromLocalStorage})
    return
  }

  const deleteLocalStorage = () => {
    localStorage.clear()
  }

  useEffect(() => {
    const geolocationAPIStatus = getGeolocationStatus()
    setGeolocationStatus(geolocationAPIStatus)
    saveCoordsToLocalStorage()
    getCoordsFromLocalStorage()
  }, [])

  useEffect(() => {
    saveCoordsToLocalStorage()
    console.log(currentLocation)
  }, [currentLocation])

  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center bg-gray-950 text-neutral-100 min-h-dvh"> 
        <p>Status: {geolocationStatus}</p>
        <div className='flex gap-3'>
          <button className='bg-amber-300 text-gray-950 p-3 rounded-3xl hover:bg-purple-700 hover:text-neutral-50' onClick={handleClick}>
            Solicitar geolocalización
          </button>
          <button className='bg-red-500 text-red-50 p-3 rounded-3xl hover:bg-red-950 hover:text-neutral-50' onClick={deleteLocalStorage}>
            Borrar LocalStorage
          </button>
        </div>
        
        {errorMsg ? <p>Error: {errorMsg}</p> : <p>👽</p>}
        {currentLocation ? <InfoComponent latitude={currentLocation.latitud} longitude={currentLocation.longitud} /> : <Loader /> }
      </div>
    </>
  )
}

export default App
