import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import MyMarker from "./myMarker.js";
import SongComponent from "./features/contents.js";
import ArrayMap from "./Stores/extractData.js";
import { getCurrentLocation } from "./getCurrentLocation.js";
import mapStyle from "./MapStyle.js";

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
  const [marker, setMarker] = useState({ lat: 35.658, lng: 139.745 });
  const [mylatlon, setMylatlon] = useState(marker);

  const containerStyle = { width: "100%", height: "90vh" };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    styles: mapStyle
  };

  useEffect(() => {
    getCurrentLocation((newLatLon) => {
      setMylatlon(newLatLon);
      setMarker(newLatLon);
      onMarkerUpdate && onMarkerUpdate(newLatLon);
    });
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
          <MyMarker
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
