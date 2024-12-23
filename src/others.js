import { MarkerF } from "@react-google-maps/api";
import { useState,useEffect} from "react";
import axios from 'axios';
import SongComponent from "./contents";

const Others = ({userName,latitude,longitude,trackID,myId}) => {

  const [trackData, setTrackData] = useState(null);
  const [markerColor,setMarkerColor] = useState("grey")

  useEffect(() => {
    const tempToken = localStorage.getItem(`spotifyToken_${myId}`);

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
          const track = response.data;
          // アルバムカバーのURLを取得（最も解像度の高い画像）
          const albumCoverUrl = track.album.images.length > 0 ? track.album.images[0].url : null;
          // trackDataにアルバムカバーURLを含める
          setTrackData({
            name: track.name,
            artists: track.artists[0].name,
            albumCover: albumCoverUrl,
          });
          setMarkerColor("#FFCCCC")
        } 
        else if(response.status ===204){
          setTrackData(null)
          setMarkerColor("#CCCCCC")
        }
      } catch (err) {
        setTrackData(null)
        setMarkerColor("#CCCCCC")
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
              fillColor: markerColor,
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

