const getGeolocationStatus = () => {
  if ("geolocation" in navigator) {
    return "Navegador compatible con Geolocalización"
  } else {
    return "Navegador incompatible con Geolocalización"
  }
}

const getUserLocation = async (onSuccess, onError) => {
  if (!navigator.geolocation) {
    onError("Geolocalización incompatible con el navegador");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const ubicacion = {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      };
      onSuccess(ubicacion);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          onError("Permiso denegado para obtener la ubicación.");
          break;
        case error.POSITION_UNAVAILABLE:
          onError("Ubicación no disponible.");
          break;
        case error.TIMEOUT:
          onError("Tiempo de espera excedido.");
          break;
        default:
          onError("Error desconocido.");
      }
    }
  );
};

const reverseGeocodingAPICall = async (latitud, longitud) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitud}&lon=${longitud}`);
  const data = await response.json();
  return data;
}

export { getUserLocation, getGeolocationStatus, reverseGeocodingAPICall }