function InfoComponent({ latitude, longitude }){

  return (
    <div className="flex flex-col gap-1 bg-amber-300 text-gray-950 rounded-3xl p-3">
      <p>Info de la API de geolocalización</p> 
      <p>Latitud: {latitude}</p>
      <p>Longitud: {longitude}</p>
      <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" className="text-6xl text-center">🗺️</a>
    </div>
  )
}

export default InfoComponent