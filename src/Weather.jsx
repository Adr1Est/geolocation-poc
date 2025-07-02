function Weather({weatherInfo}){

  return (
    <div className="flex flex-col bg-gray-800 rounded-3xl text-amber-300 text-center p-3">
      <p>🌄</p> 
      {Object.keys(weatherInfo.current).map((key) => {
        return <p>{key}: {weatherInfo.current[key]} {weatherInfo.current_units[key]}</p>
      })}
    </div>
  )
}

export default Weather