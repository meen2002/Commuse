import { MarkerF } from "@react-google-maps/api";
import { useState,useEffect} from "react";
import axios from 'axios';
import SongComponent from "./contents";

const Others = ({userName,latitude,longitude,trackID}) => {

  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    const tempToken = localStorage.getItem("spotify_token_temp");

    if (!tempToken) {
      return (null)
    }

    const fetchTrackData = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackID}`, {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });

        if (response.status === 200) {
          setTrackData(response.data);
        } 
      } catch (err) {
      }
    };

    if (trackID) {
      fetchTrackData();
    }
  }, [trackID]);





  const [clicked,setClicked] = useState(false)

  const showinfo = () => {
    const newClickedState = !clicked;
    setClicked(newClickedState); 
    console.log(clicked);
  };



  return (
    <>
          <MarkerF
            position={{
              lat: latitude,
              lng: longitude
            }
            }  // otherMarkerオブジェクトを渡す
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "yellow",
              fillOpacity: 1.0,
              strokeWeight: 2,
              strokeColor: "white",
            }}
            onClick={showinfo}
          />

          {clicked &&(
           <SongComponent
           song={trackData}
            marker={{
              lat: latitude,
              lng: longitude
            }}
            userName={userName}
           />    
        )};


      
      
    </>
  );
};

export default Others;

