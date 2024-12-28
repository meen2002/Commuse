import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext} from "@react-google-maps/api";
import BlueCircleMarker from "./Todo.js"; // マーカーをインポート
import SongComponent from "./contents.js";
import ArrayMap from "./ArrayMap.js";





const MapComponent =({userName , onMarkerUpdate ,otherData ,song, myId, userImage, status}) => {
  const [clicked, setClicked] = useState(false); // clicked 状態を管理
  
  

  // 子コンポーネントから clicked の値を受け取る関数
  const handleMarkerClick = (newClickedState) => {
    setClicked(newClickedState); // clicked の値を更新
    console.log(clicked)
  };
  const [marker,setMarker]=useState({
    lat:33,
    lng:0,
  })

  const [mylatlon, setMylatlon] = useState(marker);
  const [error, setError] = useState(null);
  const [myaccuracy, setMyaccuracy] = useState(null);  
  const containerStyle = {
    width: "100%",
    height: "90vh",
  };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
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
          if (onMarkerUpdate) {
            onMarkerUpdate(newLatLon);
          }
        },
        (error) => {
          setError(error.message); // エラーを保存
        },
        {
          enableHighAccuracy: true,
          timeout: 100,
          maximumAge: 0,
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("このブラウザでは位置情報がサポートされていません。");
    }
    console.log(marker)
    
  }, []);

  return (
    <>

      <LoadScriptNext googleMapsApiKey="AIzaSyCotC5VerJNRwfjL2CIfLBN9O2SpbVoLe4">
        <GoogleMap
          center={mylatlon}
          zoom={18}
          mapContainerStyle={containerStyle}
          options={options}
          className="map-container">
        

          {otherData &&(
            <ArrayMap 
            otherData={otherData}
            myName={userName}
            myId={myId}
            myMarker={marker}
            />
          )}

            {marker && (
            <BlueCircleMarker marker={marker} 
            onClickedChange={handleMarkerClick} 
            userImage={userImage}
            status={status}
             />
          )} 


          {clicked &&(
           <SongComponent
           song={song}
            marker={marker}
            userName={userName}
           />    
        )};


          


        </GoogleMap>


      </LoadScriptNext>


    </>
  );
};

export default MapComponent;
