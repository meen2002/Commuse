import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext, Marker} from "@react-google-maps/api";
import BlueCircleMarker from "./Todo.js"; // マーカーをインポート
import Others from "./others.js";
import SongComponent from "./contents.js";




const MapComponent =() => {
  const [clicked, setClicked] = useState(false); // clicked 状態を管理


  // 子コンポーネントから clicked の値を受け取る関数
  const handleMarkerClick = (newClickedState) => {
    setClicked(newClickedState); // clicked の値を更新
    console.log(clicked)
  };
  const [marker,setMarker]=useState({
    lat:35.658584,
    lng:139.745433,
  })
  const [song, setSong] = useState(null);
  const [otherMarker,setotherMarker]=useState({
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
    mapTypeControl: true,
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
          timeout: 1000,
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

      <LoadScriptNext googleMapsApiKey="AIzaSyCotC5VerJNRwfjL2CIfLBN9O2SpbVoLe4">
        <GoogleMap
          center={mylatlon}
          zoom={18}
          mapContainerStyle={containerStyle}
          options={options}
        >
          {marker && (
            <BlueCircleMarker marker={marker} 
            accuracy={myaccuracy} 
            onClickedChange={handleMarkerClick} 
             />
          )}
          {otherMarker &&(
            <Others marker={otherMarker} />
          )}

          {clicked &&(
        <SongComponent
        marker={marker}
         >
        </SongComponent>
          )};

          
        <SongComponent
        marker={otherMarker}>
        </SongComponent>

        </GoogleMap>


      </LoadScriptNext>


    </>
  );
};

export default MapComponent;