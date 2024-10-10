
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import BlueCircleMarker from "./Todo.js"; // マーカーをインポート

const MapComponent =() => {
  const [marker,setMarker]=useState({
    lat:35.658584,
    lng:139.745433,
  })
  const [mylatlon, setMylatlon] = useState(marker);
  const [error, setError] = useState(null);
  const [myaccuracy, setMyaccuracy] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newAccuracy = position.coords.accuracy;
          const newLatLon = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMylatlon(newLatLon); // 現在地を更新
          setMarker(newLatLon);   // 親コンポーネントにも反映
          setMyaccuracy(newAccuracy);
        },
        (error) => {
          setError(error.message); // エラーを保存
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("このブラウザでは位置情報がサポートされていません。");
    }
  }, [setMarker]);

  return (
    <>
      {error && <p>Error: {error}</p>}
      <LoadScript googleMapsApiKey="AIzaSyCotC5VerJNRwfjL2CIfLBN9O2SpbVoLe4">

        <GoogleMap
          center={mylatlon}
          zoom={18}
          mapContainerStyle={containerStyle}
          options={options}
        >
          {marker && (
            <BlueCircleMarker marker={marker} accuracy={myaccuracy} />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapComponent;
