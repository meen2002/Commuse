import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import BlueCircleMarker from "./Todo.js";
import SongComponent from "./features/contents.js";
import ArrayMap from "./Stores/extractData.js";

const MapComponent = ({
  userName,
  onMarkerUpdate,
  otherData,
  song,
  myId,
  userImage,
  status,
}) => {
  const [clicked, setClicked] = useState(false);
  const [marker, setMarker] = useState({ lat: 33, lng: 0 });
  const [mylatlon, setMylatlon] = useState(marker);

  const containerStyle = { width: "100%", height: "90vh" };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    styles: [
      {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [{ color: "#f0e7e7" }],
      },
      // More styling omitted for brevity...
    ],
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLatLon = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMylatlon(newLatLon);
          setMarker(newLatLon);
          onMarkerUpdate && onMarkerUpdate(newLatLon);
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
  }, [onMarkerUpdate]);

  const handleMarkerClick = () => setClicked((prev) => !prev);

  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyCotC5VerJNRwfjL2CIfLBN9O2SpbVoLe4">
      <GoogleMap
        center={mylatlon}
        zoom={18}
        mapContainerStyle={containerStyle}
        options={options}
      >
        {marker && (
          <BlueCircleMarker
            marker={marker}
            onClickedChange={handleMarkerClick}
            userImage={userImage}
            status={status}
          />
        )}

        {otherData && (
          <ArrayMap
            otherData={otherData}
            myName={userName}
            myId={myId}
            myMarker={marker}
          />
        )}

        {clicked && <SongComponent song={song} marker={marker} userName={userName} />}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
