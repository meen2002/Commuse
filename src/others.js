import { MarkerF } from "@react-google-maps/api";
import { useState} from "react";

const Others = ({ latitude,longitude, onClickedChange,  }) => {

  const [clicked,setClicked] = useState(false)

  const showinfo = () => {
    const newClickedState = !clicked;
    setClicked(newClickedState); 
    if (onClickedChange) {
      onClickedChange(newClickedState); 
    }
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
          />
      
      
    </>
  );
};

export default Others;

