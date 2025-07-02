function Locate({localization}){

  return (
    <div className="flex flex-col bg-gray-800 rounded-3xl text-amber-300 text-center p-3">
      <p>📍</p> 
      <p>{localization.street}</p> 
      <p>{localization.quarter}</p> 
      <p>{localization.suburb}</p> 
      <p>{localization.city}</p> 
      <p>{localization.country}</p> 
    </div>
  )
}

export default Locate