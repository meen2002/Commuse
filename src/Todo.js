import {
    MarkerF,
    CircleF
} from "@react-google-maps/api";
import { useState} from "react";


const BlueCircleMarker = ({ marker, accuracy, onClickedChange, profileImage}) => {
  const [clicked,setClicked] = useState(false)

  const showinfo = () => {
    const newClickedState = !clicked;
    setClicked(newClickedState); 
    if (onClickedChange) {
      onClickedChange(newClickedState); 
    }
    console.log(clicked);
  };

    return (<>
    <MarkerF position={marker} 

    icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10, // 円の大きさ
            fillColor: 'blue', // 青色に設定
            fillOpacity: 1.0, // 不透明度
            strokeWeight: 2, // 枠線の太さ
            strokeColor: 'white', // 枠線の色
          }}
          onClick={showinfo}                
          />
    <CircleF
              center={marker}
              radius={accuracy} // 精度を半径として設定
              options={{
                strokeOpacity: 0,
                strokeWeight: 2,
                fillColor: '#00aaff', // 円の塗りつぶし色
                fillOpacity: 0.35, // 円の透明度
              }}
            />
    </>);
};

export default BlueCircleMarker;