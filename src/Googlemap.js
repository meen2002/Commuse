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
  const containerStyle = {
    width: "100%",
    height: "90vh",
  };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    styles:[
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f0e7e7"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": 74
            },
            {
                "lightness": "93"
            },
            {
                "hue": "#00ff82"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "weight": 0.6
            },
            {
                "saturation": -85
            },
            {
                "lightness": 61
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#5f94ff"
            },
            {
                "lightness": 26
            },
            {
                "gamma": 5.86
            }
        ]
    }
]

  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLatLon = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          setMylatlon(newLatLon); // 現在地を更新
          setMarker(newLatLon);   // 親コンポーネントにも反映
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
