// geolocationUtils.js
export const getCurrentLocation = (callback) => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLatLon = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          callback(newLatLon);
        },
        (error) => console.error(error.message),
        {
          enableHighAccuracy: true,
          timeout: 100,
          maximumAge: 0,
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  